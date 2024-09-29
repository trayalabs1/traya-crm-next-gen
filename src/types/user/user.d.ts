import { loginSchema } from "@schemas/user/user";
import { z } from "zod";

export type Roles = "maker" | "checker" | "publisher";

export interface User {
  user_id: string;
  name: string;
  email: string;
  role: Roles;
}

export type LoginSchemaType = z.infer<typeof loginSchema>;
