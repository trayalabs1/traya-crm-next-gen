import { ContentSchema, ContentsSchema } from "@schemas/cms/contents";
import { z } from "zod";

export type Contents = z.infer<typeof ContentsSchema>;
export type Content = z.infer<typeof ContentSchema>;

interface ContentPayload {
  id?: string;
  payload: {
    name: string;
    type: string;
    data: {
      [key: string]: string | unknown;
    };
  };
}

export type ContentMutationPayload = ContentPayload;
