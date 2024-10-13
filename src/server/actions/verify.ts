"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { ratelimits } from "@/server/ratelimit";
import verifyFormSchema from "@/lib/zod/verify-form-schema";
import db from "@/db";
import { and, eq, gte } from "drizzle-orm";
import { users, verificationCodes } from "@/db/schema";
import { redirect, RedirectType } from "next/navigation";
import { env } from "@/env";
import resend from "../email";
import { WelcomeEmailTemplate } from "@/components/emails/welcome-email-template";

export default async function verify(body: z.infer<typeof verifyFormSchema>) {
  const ip = headers().get("x-forwarded-for") ?? "unknown";

  // Rate limit request by IP address.
  const { success } = await ratelimits.auth.verify.limit(ip);
  if (!success) throw new Error("Too many requests! Please try again later.");

  // Validate request body.
  const request = verifyFormSchema.safeParse(body);
  if (!request.success) throw new Error("Invalid body!");

  // Check if user exists.
  const user = await db.query.users.findFirst({
    where: eq(users.id, request.data.userId),
  });

  if (!user || user.emailVerified) {
    throw new Error("User does not exist or is already verified!");
  }

  // Check if a valid verification code exists.
  const verificationCode = await db.query.verificationCodes.findFirst({
    where: and(
      eq(verificationCodes.userId, request.data.userId),
      eq(verificationCodes.code, request.data.code),
      gte(verificationCodes.expiresAt, new Date()),
    ),
  });

  if (!verificationCode) throw new Error("Invalid verification code!");

  await db.transaction(async (tx) => {
    // Update user's `emailVerified` timestamp.
    await tx
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, user.id));

    // Delete all verification codes for the user, since they are now verified.
    await tx
      .delete(verificationCodes)
      .where(eq(verificationCodes.userId, user.id));
  });

  // Add user to Resend audience for Bookclub newsletter.
  await resend.contacts.create({
    audienceId: env.RESEND_AUDIENCE_ID,
    firstName: user.username,
    email: user.email,
  });

  // Schedule welcome email for the user.
  await resend.emails.send({
    from: "Nicholas Ly <hello@bookclub.social>",
    to: user.email,
    subject: "Welcome to Bookclub!",
    react: WelcomeEmailTemplate({ username: user.username }),
    // TODO: Add plain text version of welcome email.
    scheduledAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(), // 30 minutes
  });

  redirect("/auth/login", RedirectType.replace);
}
