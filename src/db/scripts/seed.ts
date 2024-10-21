/**
 * This script is used to seed the database with data.
 * Use `npm run db:seed` to run this script.
 *
 * WARNING: This script is destructive and will delete all data from specified
 * tables in the database.
 */

import postgres from "postgres";
import { env } from "@/env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../schema";
import { getTableName, sql, Table } from "drizzle-orm";

const connection = postgres(env.DATABASE_URL);
const db = drizzle(connection, { schema });

async function resetTable(database: typeof db, table: Table) {
  return database.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
  );
}

async function main() {
  console.log("⏳ Started database seed script...");

  for (const table of [
    // TODO: Add tables to seed here.
  ]) {
    await resetTable(db, table);
  }

  try {
    // TODO: Call seeding functions here.
  } catch (error) {
    console.error("❌ Error occurred during seeding:", error);
  }

  console.log("✅ Seeding complete!");
  await connection.end();
}

main();