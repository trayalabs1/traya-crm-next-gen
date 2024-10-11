import {
  ComponentContentsSchema,
  componentSchema,
  componentsSchema,
  FormComponentSchema,
} from "@schemas/cms/components";
import { z } from "zod";
import { ContentOrder } from "./content";

export type Components = z.infer<typeof componentsSchema>;
export type Component = z.infer<typeof componentSchema>;

export type FormComponentSchemaType = z.infer<typeof FormComponentSchema>;

interface ComponentPayload {
  id?: string;
  payload: FormComponentSchemaType;
}

export type ComponentMutationPayload = ComponentPayload;

export type ComponentMutationBody = {
  name: string;
  gender: string;
  language?: string;
  componentType?: string;
  title?: string;
  description?: string;
  contents?: ContentOrder[];
};
export type ComponentContentsType = z.infer<typeof ComponentContentsSchema>;

export interface ComponentOrder {
  component_id: string;
  name: string;
  order: number;
}
