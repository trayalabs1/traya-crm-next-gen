import {
  FormSegmentSchema,
  segmentComponentsContentsExpanded,
  segmentSchema,
  segmentsSchema,
} from "@schemas/cms/segments";
import { z } from "zod";

export type Segments = z.infer<typeof segmentsSchema>;
export type Segment = z.infer<typeof segmentSchema>;

export type FormSegmentSchemaType = z.infer<typeof FormSegmentSchema>;

interface SegmentPayload {
  id?: string;
  payload: FormSegmentSchemaType;
}

export type SegmentMutationPayload = SegmentPayload;

export type SegmentMutationBody = {
  name: string;
  gender: string;
  component_ids: string[];
  weeks_in_program?: string[];
  recommended_products?: string[];
  order_counts?: string;
  have_coins?: boolean;
  form_status?: string;
  stages?: number[];
  streak_length?: number[];
};

export type SegmentComponentsContentsExpandedType = z.infer<
  typeof segmentComponentsContentsExpanded
>;

export type cmsStatusFilter =
  | "draft"
  | "submitted"
  | "approved_by_checker"
  | "approved_by_publisher"
  | "published";
