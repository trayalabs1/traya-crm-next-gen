export type EntitiyType = "segment" | "component" | "content";

export interface EntitiyActionBody {
  type: EntitiyType;
  type_id: string;
  user_id: string;
}
