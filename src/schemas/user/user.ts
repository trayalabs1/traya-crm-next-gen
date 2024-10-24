import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
    .nonempty("Password is required"),
});

const RoleSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  role_id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
  rbac_id: z.string().nullable(),
  role: z.object({
    id: z.string().uuid(),
    name: z.string(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    is_active: z.boolean(),
  }),
});

const MetaSchema = z.object({
  bio: z.object({
    description: z.string(),
  }),
  shifts: z.array(z.unknown()),
  exotel_v2: z.boolean(),
  call_hippo: z.boolean(),
  breakWeekDays: z.array(z.unknown()),
});

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  shift: z.string().nullable(),
  house: z.string().nullable(),
  first_name: z.string(),
  last_name: z.string().nullable(),
  phone_number: z.string(),
  gender: z.string().nullable(),
  created_at: z.string(),
  alternate_email: z.string().email(),
  level: z.number(),
  meta: MetaSchema,
  is_consult_doctor: z.boolean(),
  is_consult_doctor_active: z.boolean(),
  voitekk_id: z.number(),
  desgination: z.string().nullable(),
  team: z.string().nullable(),
  roles: z.array(RoleSchema),
  is_supervisor: z.boolean(),
  clinic_id: z.string(),
  clinic_emp_id: z.string(),
  is_first_login: z.boolean(),
  is_not_clocked_out_yesterday: z.boolean(),
});
