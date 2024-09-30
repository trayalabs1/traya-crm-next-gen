import { z } from "zod";

export const ContentSchema = z.object({
  _id: z.string(),
  content_id: z.string(),
  name: z.string(),
  type: z.enum(["banner"]),
  status: z.enum(["draft"]),
  current_version: z.number(),
  draft_version: z.number(),
  draft_data: z.object({
    key: z.string(),
  }),
  created_at: z.string(),
  updated_at: z.string(),
  __v: z.number(),
});

export const ContentsSchema = z.object({
  row_count: z.number(),
  mainData: z.array(ContentSchema),
});
