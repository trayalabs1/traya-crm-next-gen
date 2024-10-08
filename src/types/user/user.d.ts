import { loginSchema } from "@schemas/user/user";
import { z } from "zod";

export type Roles = "maker" | "checker" | "publisher";

interface User {
  id: string;
  email: string;
  phone_number: string;
  roles: string[];
  role: Roles;
  tenants: string[];
}
export type LoginSchemaType = z.infer<typeof loginSchema>;
