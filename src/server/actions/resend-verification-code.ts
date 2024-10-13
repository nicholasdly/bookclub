"use server";

import { headers } from "next/headers";
import { ratelimits } from "../ratelimit";
import { z } from "zod";
import db from "@/db";
import { eq } from "drizzle-orm";
import { users, verificationCodes } from "@/db/schema";
import { otp } from "@/lib/utils";
import resend from "../email";
import {
  VerificationEmailTemplate,
  VerificationEmailText,
} from "@/components/emails/verification-email-template";

export default async function resendVerificationCode(body: { userId: string }) {
  const ip = headers().get("x-forwarded-for") ?? "unknown";

  // Rate limit request by IP address.
  const { success } = await ratelimits.auth.verify.limit(ip);
  if (!success) throw new Error("Too many requests! Please try again later.");

  // Validate request body.
  const request = z
    .object({ userId: z.string().trim().min(1) })
    .safeParse(body);
  if (!request.success) throw new Error("Invalid body!");

  // Check if user exists.
  const user = await db.query.users.findFirst({
    where: eq(users.id, request.data.userId),
  });

  if (!user || user.emailVerified)
    throw new Error("User does not exist or is already verified!");

  const code = otp();

  // Create verification code.
  await db.insert(verificationCodes).values({
    code,
    userId: user.id,
    expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
  });

  // Send verification code to user via email.
  await resend.emails.send({
    from: "Bookclub <hello@bookclub.social>",
    to: user.email,
    subject: "Bookclub Account Verification Code",
    react: VerificationEmailTemplate({ code }),
    text: VerificationEmailText({ code }),
  });
}
