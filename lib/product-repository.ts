import { products, type Product } from "@/data/products";
import { getDatabasePool, isDatabaseConfigured } from "@/lib/database";

type ProductRow = {
  id: string | number;
  slug: string;
  name: string;
  category: Product["category"];
  price: number | null;
  product_data: Product;
};

export type ProductInput = Omit<Product, "id">;

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

export async function getProducts(): Promise<Product[]> {
  if (!isDatabaseConfigured()) return products;

  const result = await getDatabasePool().query<ProductRow>(
    `SELECT id, slug, name, category, price::float8 AS price, product_data
     FROM products
     ORDER BY name`,
  );
  return result.rows.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!isDatabaseConfigured()) return products.find((product) => product.slug === slug);

  const result = await getDatabasePool().query<ProductRow>(
    `SELECT id, slug, name, category, price::float8 AS price, product_data
     FROM products
     WHERE slug = $1`,
    [slug],
  );
  return result.rows[0] ? mapProduct(result.rows[0]) : undefined;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const productData = { ...input, id: 0 };
  const result = await getDatabasePool().query<ProductRow>(
    `INSERT INTO products (slug, name, category, price, product_data)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, slug, name, category, price::float8 AS price, product_data`,
    [input.slug, input.name, input.category, input.price ?? null, JSON.stringify(productData)],
  );
  return mapProduct(result.rows[0]);
}

export async function updateProduct(
  id: number,
  input: ProductInput,
): Promise<Product | undefined> {
  const existing = await getDatabasePool().query<ProductRow>(
    `SELECT id, slug, name, category, price::float8 AS price, product_data
     FROM products
     WHERE id = $1`,
    [id],
  );
  if (!existing.rows[0]) return undefined;

  const product = { ...mapProduct(existing.rows[0]), ...input, id };
  const result = await getDatabasePool().query<ProductRow>(
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
  return result.rows[0] ? mapProduct(result.rows[0]) : undefined;
}

export async function deleteProduct(id: number): Promise<boolean> {
  const result = await getDatabasePool().query(
    "DELETE FROM products WHERE id = $1",
    [id],
  );
  return result.rowCount === 1;
}
