import { z } from "zod";

const verifyFormSchema = z.object({
  userId: z.string().uuid(),
  code: z
    .string()
    .trim()
    .length(6, "Enter the verification code sent to your email."),
});

export default verifyFormSchema;
