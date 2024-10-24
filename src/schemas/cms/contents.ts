import { z } from "zod";

export const ContentSchema = z.object({
  _id: z.string(),
  content_id: z.string(),
  name: z.string(),
  type: z.enum(["banner"]),
  status: z.enum([
    "draft",
    "submitted",
    "approved_by_checker",
    "approved_by_publisher",
    "published",
  ]),
  current_version: z.number(),
  draft_version: z.number(),
  data: z.record(z.string(), z.unknown()),
  draft_data: z.record(z.string(), z.unknown()),
  created_at: z.string(),
  updated_at: z.string(),
  __v: z.number(),
});

export const ContentsSchema = z.object({
  row_count: z.number(),
  mainData: z.array(ContentSchema),
});
