"use server";

import { signIn } from "@/auth";
import { loginFormSchema } from "@/lib/zod";
import { z } from "zod";

export async function login(body: z.infer<typeof loginFormSchema>) {
  const fields = await loginFormSchema.safeParseAsync(body);

  if (!fields.success) {
    return { error: "Invalid body!" };
  }

  await signIn("credentials", fields.data);
}
