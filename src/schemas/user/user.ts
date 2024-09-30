import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
    .nonempty("Password is required"),
});
