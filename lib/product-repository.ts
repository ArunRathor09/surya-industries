import { unstable_cache } from "next/cache";
import { productCategories, products, type Product } from "@/data/products";
import { getNeonSql, isDatabaseConfigured } from "@/lib/database";

type ProductRow = {
  id: number | string;
  slug: string;
  name: string;
  category: Product["category"];
  price: number | null;
  product_data: Product;
};

export type ProductInput = Omit<Product, "id">;
type ProductPageData = { product: Product; relatedProducts: Product[] };

function mapProduct(row: ProductRow): Product {
  return {
    ...row.product_data,
    id: Number(row.id),
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
  };
}

function toCatalogProduct(product: Product): Product {
  const catalogProduct = { ...product };
  delete catalogProduct.applications;
  delete catalogProduct.guideSections;
  delete catalogProduct.protectionRadius;
  return catalogProduct;
}

export async function getProducts(): Promise<Product[]> {
  if (!isDatabaseConfigured()) return products;

  const rows = await getNeonSql().query(
    `SELECT id, slug, name, category, price::float8 AS price, product_data
     FROM products
     ORDER BY name`,
  );
  return rows.map((row) => mapProduct(row as ProductRow));
}

async function queryCatalogProducts(): Promise<Product[]> {
  const rows = await getNeonSql().query(
    `SELECT id, slug, name, category, price::float8 AS price,
            product_data - 'applications' - 'guideSections' - 'protectionRadius' AS product_data
     FROM products
     ORDER BY name`,
  );
  return rows.map((row) => mapProduct(row as ProductRow));
}

const getCachedCatalogProducts = unstable_cache(
  queryCatalogProducts,
  ["product-catalog"],
  { revalidate: 3600, tags: ["products"] },
);

async function queryProductCategories(): Promise<string[]> {
  const rows = await getNeonSql().query(
    "SELECT name FROM product_categories ORDER BY name",
  );
  return rows.map((row) => String(row.name));
}

const getCachedProductCategories = unstable_cache(
  queryProductCategories,
  ["product-categories"],
  { revalidate: 3600, tags: ["products"] },
);

export async function getCatalogProducts(): Promise<Product[]> {
  if (!isDatabaseConfigured()) return products.map(toCatalogProduct);
  return getCachedCatalogProducts();
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  if (slugs.length === 0) return [];
  if (!isDatabaseConfigured()) {
    const slugSet = new Set(slugs);
    return products.filter((product) => slugSet.has(product.slug));
  }

  const placeholders = slugs.map((_, index) => `$${index + 1}`).join(", ");
  const rows = await getNeonSql().query(
    `SELECT id, slug, name, category, price::float8 AS price, product_data
     FROM products
     WHERE slug IN (${placeholders})`,
    slugs,
  );
  return rows.map((row) => mapProduct(row as ProductRow));
}

async function queryProductPageData(slug: string): Promise<ProductPageData | null> {
  const rows = await getNeonSql().query(
    `WITH selected AS (
       SELECT id, slug, name, category, price::float8 AS price, product_data
       FROM products
       WHERE slug = $1
     ),
     related AS (
       SELECT id, slug, name, category, price::float8 AS price, product_data
       FROM products
       WHERE category = (SELECT category FROM selected) AND slug <> $1
       ORDER BY name
       LIMIT 3
     )
     SELECT id, slug, name, category, price, product_data FROM selected
     UNION ALL
     SELECT id, slug, name, category, price, product_data FROM related`,
    [slug],
  );
  const productRow = rows.find((row) => (row as ProductRow).slug === slug) as
    | ProductRow
    | undefined;
  if (!productRow) return null;

  return {
    product: mapProduct(productRow),
    relatedProducts: rows
      .filter((row) => (row as ProductRow).slug !== slug)
      .map((row) => mapProduct(row as ProductRow))
      .sort((first, second) => first.name.localeCompare(second.name)),
  };
}

const getCachedProductPageData = unstable_cache(
  queryProductPageData,
  ["product-page-data"],
  { revalidate: 3600, tags: ["products"] },
);

export async function getProductPageData(
  slug: string,
): Promise<ProductPageData | undefined> {
  if (!isDatabaseConfigured()) {
    const product = products.find((item) => item.slug === slug);
    if (!product) return undefined;
    return {
      product,
      relatedProducts: products
        .filter((item) => item.category === product.category && item.slug !== slug)
        .slice(0, 3),
    };
  }

  return (await getCachedProductPageData(slug)) ?? undefined;
}

export async function getProductCategories(options: { allowMissingTableFallback?: boolean } = {}): Promise<string[]> {
  if (!isDatabaseConfigured()) return [...productCategories];

  try {
    return await getCachedProductCategories();
  } catch (error) {
    if (
      !options.allowMissingTableFallback ||
      typeof error !== "object" ||
      error === null ||
      !("code" in error) ||
      error.code !== "42P01"
    ) {
      throw error;
    }

    return [...productCategories].sort((first, second) => first.localeCompare(second));
  }
}

export async function createProductCategory(name: string): Promise<string> {
  const rows = await getNeonSql().query(
    "INSERT INTO product_categories (name) VALUES ($1) RETURNING name",
    [name],
  );
  if (!rows[0]) throw new Error("The new category was not returned by the database.");
  return String(rows[0].name);
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const productData = { ...input, id: 0 };
  const rows = await getNeonSql().query(
    `INSERT INTO products (slug, name, category, price, product_data)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, slug, name, category, price::float8 AS price, product_data`,
    [input.slug, input.name, input.category, input.price ?? null, JSON.stringify(productData)],
  );
  if (!rows[0]) throw new Error("The new product was not returned by the database.");
  return mapProduct(rows[0] as ProductRow);
}

export async function updateProduct(
  id: number,
  input: ProductInput,
): Promise<Product | undefined> {
  const product = { ...input, id };
  const rows = await getNeonSql().query(
    `UPDATE products
     SET slug = $2, name = $3, category = $4, price = $5, product_data = $6,
         updated_at = NOW()
     WHERE id = $1
     RETURNING id, slug, name, category, price::float8 AS price, product_data`,
    [
      id,
      product.slug,
      product.name,
      product.category,
      product.price ?? null,
      JSON.stringify(product),
    ],
  );
  return rows[0] ? mapProduct(rows[0] as ProductRow) : undefined;
}

export async function deleteProduct(id: number): Promise<boolean> {
  const rows = await getNeonSql().query(
    "DELETE FROM products WHERE id = $1 RETURNING id",
    [id],
  );
  return rows.length === 1;
}
