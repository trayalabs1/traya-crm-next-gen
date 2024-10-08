import {
  ComponentContentsSchema,
  componentSchema,
  componentsSchema,
  FormComponentSchema,
} from "@schemas/cms/components";
import { z } from "zod";

export type Components = z.infer<typeof componentsSchema>;
export type Component = z.infer<typeof componentSchema>;

export type FormComponentSchemaType = z.infer<typeof FormComponentSchema>;

interface ComponentPayload {
  id?: string;
  payload: FormComponentSchemaType;
}

export type ComponentMutationPayload = ComponentPayload;

export type ComponentContentsType = z.infer<typeof ComponentContentsSchema>;

export interface ComponentOrder {
  component_id: string;
  name: string;
  order: number;
}
