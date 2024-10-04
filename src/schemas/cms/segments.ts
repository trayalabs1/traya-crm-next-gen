import { z } from "zod";

export const segmentSchema = z.object({
  _id: z.string(),
  data: z.object({
    components_ids: z.array(z.string()),
  }),
  draft_data: z.object({
    component_ids: z.array(z.string()),
  }),
  name: z.string(),
  segment_id: z.string(),
  gender: z.enum(["All", "M", "F"]),
  weeks_in_program: z.array(z.string()),
  order_counts: z.array(z.number()),
  recommended_products: z.array(z.string()),
  status: z.enum([
    "draft",
    "submitted",
    "approved_by_checker",
    "approved_by_publisher",
    "published",
  ]),
  current_version: z.number(),
  draft_version: z.number(),
  app_page_category: z.array(z.string()),
  customer_type: z.enum(["All", "Draft", "Lead", "Customer"]),
  form_status: z.enum(["NotStarted", "Started", "Completed"]),
  stages: z.array(z.number()),
  have_coins: z.boolean(),
  streak_length: z.array(z.number()),
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
  name: z.string({ message: "Name is required." }).optional(),
  // .min(3, { message: "Name must be at least 3 characters long." }),
  gender: z
    .object(
      { value: z.string(), label: z.string() },
      { message: "Gender is required" },
    )
    .optional(),
  weeksInProgram: z
    .array(z.object({ value: z.string(), label: z.string() }))
    // .min(1, { message: "Weeks In Program is required." })
    .optional(),
  orderCounts: z.union([
    z.number().optional(),
    // .min(0, { message: "Order count cannot be negative" })
    // .max(1000, { message: "Order count cannot exceed 1000" })
    // .refine((val) => val !== null && val !== undefined, {
    //   message: "Order Count is required",
    // }),
    z.string().optional(),
    // .refine(
    //   (val) => {
    //     const numVal = Number(val);
    //     return !isNaN(numVal) && numVal >= 0;
    //   },
    //   {
    //     message:
    //       "Order count should be a valid number as a string and cannot be negative",
    //   },
    // )
    // .refine((val) => val.trim() !== "", {
    //   message: "Order Count is required",
    // }),
  ]),
  // .refine((value) => value !== null && value !== undefined, {
  //   message: "Order Count is required",
  // }),
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
    .array(
      z.object(
        { value: z.string(), label: z.string() },
        { message: "Stages is required." },
      ),
    )
    .optional(),
  coins: z
    .object(
      { value: z.string(), label: z.string() },
      { message: "Coins is required." },
    )
    .optional(),
  streaks: z
    .array(
      z.object(
        { value: z.string(), label: z.string() },
        { message: "Steaks is required." },
      ),
    )
    .optional(),
  phases: z
    .object(
      { value: z.string(), label: z.string() },
      { message: "Phases is required." },
    )
    .optional(),
  daysSinceLatestFormFilled: z
    .object(
      { value: z.string(), label: z.string() },
      { message: "Days Since Latest Form Filled is required." },
    )
    .optional(),
});

export const segmentComponentsContentsExpanded = z.array(
  z.object({
    componentId: z.string(),
    name: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.enum(["published"]),
    current_version: z.number(),
    contents: z
      .array(
        z.object({
          content_id: z.string(),
          content_name: z.string(),
          content_type: z.string(),
          content_data: z.record(z.union([z.string(), z.object({})])),
        }),
      )
      .optional(),
  }),
);
