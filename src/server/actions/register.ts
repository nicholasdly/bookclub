"use server";

import { eq, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import db from "@/db";
import { lower } from "@/db/helpers";
import { profiles, users } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import registerFormSchema from "@/lib/zod/register-form-schema";

import { ratelimits } from "../ratelimit";

export async function register(body: z.infer<typeof registerFormSchema>) {
  const ip = headers().get("x-forwarded-for") ?? "unknown";

  const { success } = await ratelimits.auth.register.limit(ip);
  if (!success) return { error: "Too many requests! Please try again later." };

  const request = registerFormSchema.safeParse(body);
  if (!request.success) return { error: "Invalid body!" };

  const [existingUser] = await db
    .select({
      id: users.id,
      email: users.email,
      username: profiles.username,
    })
    .from(profiles)
    .innerJoin(users, eq(profiles.id, users.id))
    .where(
      or(
        eq(lower(profiles.username), request.data.username.toLowerCase()),
        eq(lower(users.email), request.data.email.toLowerCase()),
      ),
    )
    .limit(1);

  if (
    existingUser &&
    existingUser.email!.toLowerCase() === request.data.email.toLowerCase()
  ) {
    return { error: "That email is already taken!" };
  }

  if (
    existingUser &&
    existingUser.username.toLowerCase() === request.data.username.toLowerCase()
  ) {
    return { error: "That username is already taken!" };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email: request.data.email,
    password: request.data.password,
    options: {
      data: {
        username: request.data.username,
        display_name: request.data.name,
      },
    },
  });

  if (error) {
    switch (error.code) {
      default:
        console.error({
          cause: "supabase.auth.signUp",
          code: error.code,
          message: error.message,
        });
        return { error: "Something went wrong!" };
    }
  }

  const searchParams = new URLSearchParams({ email: request.data.email });

  revalidatePath("/", "layout");
  redirect("/auth/verify?" + searchParams.toString());
}
