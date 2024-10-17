import { z } from "zod";

const DataContentSchema = z.record(z.string(), z.unknown());
const DataSegmentSchema = z.object({
  component_ids: z.array(
    z.object({
      component_id: z.string(),
      name: z.string(),
      order: z.number(),
    }),
  ),
});
const DataComponentSchema = z.object({
  title: z.string(),
  description: z.string(),
  content_ids: z.array(
    z.object({
      content_id: z.string(),
      name: z.string(),
      order: z.number(),
    }),
  ),
});

const DataUnion = z
  .union([DataSegmentSchema, DataComponentSchema, DataContentSchema])
  .nullable();
export const VersionHistorySchema = z.object({
  _id: z.string(),
  entity_type: z.enum(["segment", "component", "content"]),
  entity_id: z.string(),
  from_version: z.number(),
  to_version: z.number(),
  old_data: DataUnion,
  new_data: DataUnion,
  status: z.string(),
  user_id: z.string(),
  user_name: z.string(),
  role: z.string(),
  comments: z.string().optional(),
  attachments: z.array(z.object({ url: z.string() })).optional(),
  created_at: z.string(),
  __v: z.number(),
});
