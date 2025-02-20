export type Role = "GM" | "PLAYER";
export type ThemeMode = "DARK" | "LIGHT";

export type LootPackage = {
  id: string;
  title: string;
  lootPackage: string;
  distributed?: boolean;
};

export type BroadcastMsg = {
  data: unknown;
  connectionId: string;
};
