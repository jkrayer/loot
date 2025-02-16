import { propOr } from "ramda";
import OBR from "@owlbear-rodeo/sdk";
import type { LootPackage, LP } from "./types";

// CONSTANTS ///////////////////////////////////////////////////////////////////
export const APPLICATION_KEY = "com.jameskrayer/loot";
export const PACKAGE = "Package";

// GETTERS /////////////////////////////////////////////////////////////////////
export const getApplicationData = propOr([], APPLICATION_KEY);

// SETTERS /////////////////////////////////////////////////////////////////////
export function setAutomationContextMenu(lootPackages: LootPackage[]) {
  OBR.scene.setMetadata({
    [APPLICATION_KEY]: lootPackages,
  });
}

export function createEmptyLootPackage(): LP {
  return {
    title: "",
    lootPackage: "",
  };
}

export function createLootPackage(part: LP): LootPackage {
  return {
    ...part,
    id: Date.now().toString() + Math.trunc(1000 * Math.random()),
  };
}
