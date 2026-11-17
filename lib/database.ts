import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

const globalForNeon = globalThis as typeof globalThis & {
  neonSql?: NeonQueryFunction<false, false>;
};

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getNeonSql(): NeonQueryFunction<false, false> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required for catalog administration.");
  }

  globalForNeon.neonSql ??= neon(connectionString);
  return globalForNeon.neonSql;
}
