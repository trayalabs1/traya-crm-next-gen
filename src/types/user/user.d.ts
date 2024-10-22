import { loginSchema, ProfileSchema } from "@schemas/user/user";
import { z } from "zod";

export type Roles = "maker" | "checker" | "publisher";

interface User {
  id: string;
  email: string;
  first_name: string;
  phone_number: string;
  roles: string[];
  role: Roles;
  tenants: string[];
}
export type LoginSchemaType = z.infer<typeof loginSchema>;

export type Profile = z.infer<typeof ProfileSchema>;

export type LoginFrom = "password" | "login" | "guest" | "crm";
