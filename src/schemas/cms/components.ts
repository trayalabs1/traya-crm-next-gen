import { z } from "zod";
import { ContentSchema } from "./contents";

export const componentSchema = z.object({
  data: z.object({
    title: z.string().nullable(),
    description: z.string().nullable(),
    content_ids: z.array(z.string()),
  }),
  draft_data: z.object({
    content_ids: z.array(z.string()),
  }),
  _id: z.string(),
  component_id: z.string(),
  name: z.string(),
  status: z.enum(["draft", "published"]),
  current_version: z.number().int().positive(),
  created_at: z.string(),
  updated_at: z.string(),
  __v: z.number().int(),
});

export const componentsSchema = z.object({
  total_count: z.number(),
  mainData: z.array(componentSchema),
});

export const FormComponentSchema = z.object({
  name: z.string({ message: "Name is required." }).optional(),
  // .min(3, { message: "Name must be at least 3 characters long." }),
  data: z.object({
    title: z.string({ message: "Title is required." }).optional(),
    // .min(3, { message: "Title must be at least 3 characters long." }),
    description: z.string({ message: "Description is required." }).optional(),
    // .min(3, { message: "Description must be at least 3 characters long." })
    // .optional(),
    contents: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .min(1, { message: "Content is required." }),
  }),
});

export const ComponentContentsSchema = z.array(
  z.object({
    contentId: z.string(),
    content_data: z.array(z.object({}).nullable()),
    contents: ContentSchema,
    _id: z.string(),
    component_id: z.string(),
    name: z.string(),
    data: z.object({
      title: z.string(),
      description: z.string(),
      content_ids: z.array(z.string()),
    }),
    status: z.enum(["draft"]),
    current_version: z.number(),
    draft_version: z.number(),
    content_name: z.string(),
    content_type: z.enum(["banner"]),
  }),
);
