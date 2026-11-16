import { loadEnvConfig } from "@next/env";
import { readFile } from "node:fs/promises";
import { getDatabasePool } from "@/lib/database";

loadEnvConfig(process.cwd());

async function main() {
  const migration = await readFile("db/migrations/001_product_catalog.sql", "utf8");
  const pool = getDatabasePool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(migration);
    await client.query("COMMIT");
    console.info("Product catalog migration applied.");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error("Product catalog migration failed:", error);
  process.exitCode = 1;
});
