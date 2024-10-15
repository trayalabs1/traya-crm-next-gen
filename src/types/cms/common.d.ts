export type EntitiyType = "segment" | "component" | "content";

export interface EntitiyActionBody {
  type: EntitiyType;
  type_id: string;
  user_id: string;
  comment?: string;
  attachments?: string[];
}

export interface EntitiyActionDiscardBody extends EntitiyActionBody {
  type: EntitiyType;
  type_id: string;
  user_id: string;
  role: "MAKER" | "CHECKER" | "PUBLISHER";
}
