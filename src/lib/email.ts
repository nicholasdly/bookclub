"use server";

import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { env } from "@/env";
import { Ratelimit } from "@upstash/ratelimit";
import { waitlistFormSchema } from "@/components/waitlist-form";
import { z } from "zod";
import { headers } from "next/headers";
import WaitlistEmailTemplate from "@/components/waitlist-email-template";

const redis = Redis.fromEnv();
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 d"),
  analytics: true,
});

const resend = new Resend(env.RESEND_API_KEY);

export async function addToWaitlist(form: z.infer<typeof waitlistFormSchema>) {
  try {
    const ip = headers().get("x-forwarded-for") ?? "unknown";

    // Rate limit request by IP address.
    const { success } = await ratelimit.limit(ip);
    if (!success) return { error: "Too many requests! Try again tomorrow." };

    // Capitalize first letter of first and last name.
    const firstName =
      form.firstName.charAt(0).toUpperCase() + form.firstName.slice(1);
    const lastName =
      form.lastName.charAt(0).toUpperCase() + form.lastName.slice(1);

    // Fetch existing contacts in audience.
    const { data: contacts } = await resend.contacts.list({
      audienceId: env.RESEND_AUDIENCE_ID,
    });

    if (contacts?.data == null) throw new Error("Failed to fetch contacts!");

    // Add user to Resend audience.
    const { data: contact } = await resend.contacts.create({
      audienceId: env.RESEND_AUDIENCE_ID,
      firstName,
      lastName,
      email: form.email,
    });

    if (!contact?.id) throw new Error("Failed to add contact to audience!");

    if (contacts.data.find((c) => c.id === contact.id)) {
      return { error: "You've already joined the waitlist!" };
    }

    // Send greeting email to user.
    const { data: email } = await resend.emails.send({
      from: "Nicholas Ly <hello@bookclub.social>",
      to: [form.email],
      subject: "Thanks for joining the Bookclub waitlist!",
      react: WaitlistEmailTemplate({ firstName }),
    });

    if (!email?.id) throw new Error("Failed to send email!");

    return { success: "Successfully joined the waitlist!" };
  } catch (error) {
    return { error: "Something went wrong! Please try again later." };
  }
}
