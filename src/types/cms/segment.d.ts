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

export type SegmentComponentsContentsExpandedType = z.infer<
  typeof segmentComponentsContentsExpanded
>;
