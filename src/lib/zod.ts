import { z } from "zod";

export const loginFormSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Please enter a valid username or email."),
  password: z.string().min(1, "Please enter a valid password."),
});

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, "Username must contain at least 4 characters.")
      .max(15, "Username cannot exceed than 15 characters.")
      .refine((value) => /^[a-z0-9_]+$/.test(value), {
        message:
          "Username can only consist of lowercase letters, numbers, and underscores.",
      }),
    password: z
      .string()
      .min(6, "Password must contain at least 6 characters.")
      .max(255, "Password cannot exceed 255 characters."),
    confirmation: z.string().min(1, "Please re-enter your password."),
    email: z.string().email("Please enter a valid email address."),
    name: z
      .string()
      .trim()
      .min(1, "Please enter a valid display name.")
      .max(20, "Display name cannot be more than 20 characters."),
  })
  .refine((data) => data.password === data.confirmation, {
    message: "Passwords do not match.",
    path: ["confirmation"],
  });
