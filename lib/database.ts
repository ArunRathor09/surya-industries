import { Pool } from "pg";

const globalForDatabase = globalThis as typeof globalThis & {
  productDatabasePool?: Pool;
};

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDatabasePool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required for catalog administration.");
  }

  if (!globalForDatabase.productDatabasePool) {
    globalForDatabase.productDatabasePool = new Pool({
      connectionString,
      ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: true } : undefined,
      max: 10,
    });
  }

  return globalForDatabase.productDatabasePool;
}
