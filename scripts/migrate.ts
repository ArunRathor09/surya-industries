import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadEnvConfig } from "@next/env";
import { getNeonSql } from "@/lib/database";

loadEnvConfig(process.cwd());

async function main() {
  const sql = getNeonSql();
  const migrationDirectory = join(process.cwd(), "db/migrations");
  const migrations = (await readdir(migrationDirectory))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const migrationName of migrations) {
    const migration = await readFile(join(migrationDirectory, migrationName), "utf8");
    for (const statement of migration.split(";").map((part) => part.trim()).filter(Boolean)) {
      await sql.query(statement);
    }
  }
  await sql.query(`
    SELECT setval(
      pg_get_serial_sequence('products', 'id'),
      COALESCE(MAX(id), 1),
      MAX(id) IS NOT NULL
    )
    FROM products
  `);

  console.info("Neon product catalog schema is ready.");
}

main().catch((error: unknown) => {
  console.error("Neon product catalog migration failed:", error);
  process.exitCode = 1;
});
