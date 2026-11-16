import { loadEnvConfig } from "@next/env";
import { products } from "@/data/products";
import { getDatabasePool } from "@/lib/database";

loadEnvConfig(process.cwd());

async function main() {
  const pool = getDatabasePool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    for (const product of products) {
      await client.query(
        `INSERT INTO products (id, slug, name, category, price, product_data)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (slug) DO NOTHING`,
        [
          product.id,
          product.slug,
          product.name,
          product.category,
          product.price ?? null,
          JSON.stringify({ ...product, price: product.price ?? null }),
        ],
      );
    }

    await client.query(
      `SELECT setval(
        pg_get_serial_sequence('products', 'id'),
        COALESCE((SELECT MAX(id) FROM products), 1),
        true
      )`,
    );
    await client.query("COMMIT");
    console.info(`Catalog seed complete (${products.length} existing products checked).`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error("Product catalog seed failed:", error);
  process.exitCode = 1;
});
