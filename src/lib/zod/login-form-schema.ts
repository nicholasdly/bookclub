import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter a valid password."),
});

export default loginFormSchema;
