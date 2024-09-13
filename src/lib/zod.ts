import { z } from "zod";

export const loginFormSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Please enter a valid username or email."),
  password: z.string().trim().min(1, "Please enter a valid password."),
});

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, "Username must be at least 4 characters.")
      .max(15, "Username cannot be more than 15 characters.")
      .refine((value) => /^[a-z0-9_]+$/.test(value), {
        message:
          "Username can only consist of lowercase letters, numbers, and underscores.",
      }),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters.")
      .max(255, "Password cannot be more than 255 characters."),
    confirmation: z.string().min(1, "Please confirm your password."),
    email: z.string().email(),
    name: z
      .string()
      .trim()
      .min(1, "Please enter a valid display name.")
      .max(20, "Display name cannot be more than 20 characters."),
  })
  .refine((data) => data.password === data.confirmation, {
    message: "Passwords don't match",
    path: ["confirmation"],
  });
