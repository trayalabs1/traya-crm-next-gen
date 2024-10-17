import { VersionHistorySchema } from "@schemas/cms/versionHistory";

export type EntitiyType = "segment" | "component" | "content" | "unknown";

export interface EntitiyActionBody {
  type: EntitiyType;
  type_id: string;
  user_id: string;
  comments?: string;
  attachments?: string[];
}

export interface EntitiyActionDiscardBody extends EntitiyActionBody {
  type: EntitiyType;
  type_id: string;
  user_id: string;
  role: "MAKER" | "CHECKER" | "PUBLISHER";
}

export interface VersionHistoryParams {
  entityType: EntitiyType;
  entityId: string;
}

export type VersionHistory = z.infer<typeof VersionHistorySchema>;
