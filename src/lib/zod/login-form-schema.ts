import { z } from "zod";

const loginFormSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Please enter a valid username or email."),
  password: z.string().min(1, "Please enter a valid password."),
});

export default loginFormSchema;
