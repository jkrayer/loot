import OBR from "@owlbear-rodeo/sdk";
import { APPLICATION_KEY, APPLICATION_MODAL_KEY } from "./constants";
import { updateLoot } from "./scene-crud";
import type { LootPackage } from "../types";

const lootPopover = (id: string) =>
  OBR.popover.open({
    id: APPLICATION_MODAL_KEY,
    url: `/loot/src/Modal/index.html?packageId=${id}`,
    height: 300,
    width: 400,
  });

export const preview = (loot: LootPackage): Promise<void> =>
  lootPopover(loot.id);

export function sendLoot(loot: LootPackage): void {
  updateLoot({ ...loot, distributed: true });
  lootPopover(loot.id);
  OBR.broadcast.sendMessage(APPLICATION_KEY, loot.id);
}

export const showMessage = ({
  data,
}: {
  data: unknown;
  connectionId: string;
}) => lootPopover(data as string);
