import OBR from "@owlbear-rodeo/sdk";
import { APPLICATION_KEY } from "./constants";
import { updateLoot } from "./scene-crud";
import type { BroadcastMsg, LootPackage } from "../types";

export function sendLoot(loot: LootPackage): void {
  OBR.notification.show(loot.lootPackage);
  OBR.broadcast.sendMessage(APPLICATION_KEY, loot.lootPackage);
  updateLoot({ ...loot, distributed: true });
  //
}

export function showMessage({ data }: BroadcastMsg) {
  OBR.notification.show(String(data));
}

export const preview = (loot: LootPackage): Promise<string> =>
  OBR.notification.show(loot.lootPackage);
