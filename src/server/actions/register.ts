"use server";

import { hash } from "@node-rs/argon2";
import { registerFormSchema } from "@/lib/zod";
import { z } from "zod";
import { users } from "../db/schema";
import db from "../db";
import { eq, or } from "drizzle-orm";
import { hashingOptions, signIn } from "@/server/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";

export async function register(body: z.infer<typeof registerFormSchema>) {
  const ip = headers().get("x-forwarded-for") ?? "unknown";
  const { success } = await ratelimit.auth.register.limit(ip);
  if (!success) return { error: "Rate limit exceeded!" };

  const fields = registerFormSchema.safeParse(body);

  if (!fields.success) {
    return { error: "Invalid body!" };
  }

  const existingUser = await db.query.users.findFirst({
    where: or(
      eq(users.username, fields.data.username),
      eq(users.email, fields.data.email),
    ),
  });

  if (existingUser && existingUser.username === fields.data.username) {
    return { error: "A user already exists with that username!" };
  }

  if (existingUser && existingUser.email === fields.data.email) {
    return { error: "A user already exists with that email!" };
  }

  await db.insert(users).values({
    ...fields.data,
    passwordHash: await hash(body.password, hashingOptions),
  });

  await signIn("credentials", {
    identifier: fields.data.username,
    password: fields.data.password,
  });
}
