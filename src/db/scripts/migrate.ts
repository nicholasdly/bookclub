/**
 * This script is used to run migration scripts on the connected database.
 * After running `npm run db:generate` to generate a migration, use
 * `npm run db:migrate` to run this script.
 *
 * WARNING: This script should NEVER be manually ran on a production database.
 */

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import "dotenv/config";
import { env } from "@/env";
import * as schema from "../schema";

const connection = postgres(env.DATABASE_URL, { max: 1, onnotice: () => {} });
const db = drizzle(connection, { schema });

async function main() {
  console.log("⏳ Started database migration script...");
  migrate(db, { migrationsFolder: "./src/db/migrations" })
    .then(() => console.log("✅ Database migrations completed!"))
    .catch((error) => {
      console.error("❌ Error occurred during migration:", error);
    })
    .finally(async () => await connection.end());
}

main();
