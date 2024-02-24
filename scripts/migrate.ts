import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import * as schema from "../src/server/db/schema";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { Client } from "@planetscale/database";

import * as dotenv from "dotenv";
dotenv.config();

console.log("Connecting to database...");
const connection = new Client({ url: process.env.DATABASE_URL });
const db = drizzle(connection.connection(), { schema });

console.log("Running migration...");
await migrate(db, { migrationsFolder: "migrations" });
console.log("Successfully completed migration!");
