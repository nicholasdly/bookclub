import { z } from "zod";

const restrictedUsernames = [
  "admin",
  "administrator",
  "support",
  "bookclub",
  "home",
];

const registerFormSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, "Username must contain at least 4 characters.")
      .max(15, "Username cannot exceed more than 15 characters.")
      .refine((username) => /^[a-z0-9_]+$/.test(username), {
        message:
          "Username can only consist of lowercase letters, numbers, and underscores.",
      })
      .refine((username) => !restrictedUsernames.includes(username), {
        message: "Username is restricted.",
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

export default registerFormSchema;
