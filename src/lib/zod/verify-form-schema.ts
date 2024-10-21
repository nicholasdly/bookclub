import { z } from "zod";

const verifyFormSchema = z.object({
  email: z.string().email(),
  token: z
    .string()
    .trim()
    .length(6, "Enter the verification code sent to your email."),
});

export default verifyFormSchema;
