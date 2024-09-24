import { z } from "zod";

export const segmentSchema = z.object({
  _id: z.string(),
  data: z.object({
    components_ids: z.array(z.string()),
  }),
  draft_data: z.object({
    components_ids: z.array(z.string()),
  }),
  name: z.string(),
  segment_id: z.string(),
  gender: z.enum(["male", "female"]),
  weeks_in_program: z.array(z.number()),
  order_counts: z.number(),
  recommended_products: z.array(z.string()),
  status: z.enum(["published", "draft"]),
  current_version: z.number(),
  draft_version: z.number(),
  created_by: z.string(),
  updated_by: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  __v: z.number(),
});

export const segmentsSchema = z.object({
  row_count: z.number(),
  mainData: z.array(segmentSchema),
});

export const FormSegmentSchema = z.object({
  name: z
    .string({ message: "Name is required." })
    .min(3, { message: "Name must be at least 3 characters long." }),
  gender: z.object(
    { value: z.string(), label: z.string() },
    { message: "Gender is required" },
  ),
  weeksInProgram: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "Weeks In Program is required." }),
  orderCounts: z
    .union([
      z
        .number()
        .min(0, { message: "Order count cannot be negative" })
        .max(1000, { message: "Order count cannot exceed 1000" })
        .refine((val) => val !== null && val !== undefined, {
          message: "Order Count is required",
        }),
      z
        .string()
        .refine(
          (val) => {
            const numVal = Number(val);
            return !isNaN(numVal) && numVal >= 0;
          },
          {
            message:
              "Order count should be a valid number as a string and cannot be negative",
          },
        )
        .refine((val) => val.trim() !== "", {
          message: "Order Count is required",
        }),
    ])
    .refine((value) => value !== null && value !== undefined, {
      message: "Order Count is required",
    }),
  recommendedProducts: z
    .array(
      z.object(
        { value: z.string(), label: z.string() },
        { message: "Recommended Products is invalid" },
      ),
    )
    .optional(),
  components: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "Component is required." }),
  formStatus: z
    .object(
      { value: z.string(), label: z.string() },
      { message: "Form Status is required." },
    )
    .optional(),
  stages: z
    .object(
      { value: z.string(), label: z.string() },
      { message: "Stages is required." },
    )
    .optional(),
  coins: z
    .object(
      { value: z.string(), label: z.string() },
      { message: "Coins is required." },
    )
    .optional(),
  streaks: z
    .object(
      { value: z.string(), label: z.string() },
      { message: "Steaks is required." },
    )
    .optional(),
  phases: z
    .object(
      { value: z.string(), label: z.string() },
      { message: "Phases is required." },
    )
    .optional(),
  daysSinceLatestFormFilled: z.object(
    { value: z.string(), label: z.string() },
    { message: "Days Since Latest Form Filled is required." },
  ),
});
