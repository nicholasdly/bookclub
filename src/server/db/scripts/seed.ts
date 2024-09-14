import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { hash } from "@node-rs/argon2";
import { hashingOptions } from "@/server/auth";

import * as schema from "../schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seedUsers(): Promise<InferSelectModel<typeof schema.users>[]> {
  const passwordHash = await hash("password", hashingOptions);

  const users: InferInsertModel<typeof schema.users>[] = [
    {
      name: "Test User 1",
      username: "testuser1",
      email: "testuser1@gmail.com",
      passwordHash,
    },
    {
      name: "Test User 2",
      username: "testuser2",
      email: "testuser2@gmail.com",
      passwordHash,
    },
    {
      name: "Test User 3",
      username: "testuser3",
      email: "testuser3@gmail.com",
      passwordHash,
    },
  ];

  await db.delete(schema.users);
  return await db.insert(schema.users).values(users).returning();
}

async function seed() {
  await seedUsers();
}

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
