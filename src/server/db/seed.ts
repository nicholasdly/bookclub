import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

import * as schema from "./schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {}

async function main() {
  try {
    console.log("⏳ Started database seeding script...");
    await seed();
    console.log("✅ Database seeding completed!\n");
  } catch (error) {
    console.error("❌ Error occurred during seeding:", error);
    process.exit(1);
  }
}

main();
