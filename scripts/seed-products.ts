import { loadEnvConfig } from "@next/env";
import { products } from "@/data/products";
import { getNeonSql } from "@/lib/database";

loadEnvConfig(process.cwd());

async function main() {
  const sql = getNeonSql();
  const results = await sql.transaction((transaction) =>
    products.map((product) =>
      transaction`
        INSERT INTO products (id, slug, name, category, price, product_data)
        VALUES (
          ${product.id},
          ${product.slug},
          ${product.name},
          ${product.category},
          ${product.price ?? null},
          ${JSON.stringify(product)}::jsonb
        )
        ON CONFLICT (slug) DO NOTHING
        RETURNING id
      `,
    ),
  );
  await sql.query(`
    SELECT setval(
      pg_get_serial_sequence('products', 'id'),
      COALESCE(MAX(id), 1),
      MAX(id) IS NOT NULL
    )
    FROM products
  `);

  const inserted = results.filter((result) => result.length > 0).length;
  console.info(
    `Neon catalog seed complete (${inserted} inserted, ${products.length - inserted} already present).`,
  );
}

main().catch((error: unknown) => {
  console.error("Neon catalog seed failed:", error);
  process.exitCode = 1;
});
