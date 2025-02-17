import { propOr } from "ramda";
import OBR from "@owlbear-rodeo/sdk";
import type { LootPackage } from "./types";

// CONSTANTS ///////////////////////////////////////////////////////////////////
export const APPLICATION_KEY = "com.jameskrayer/loot";
export const PACKAGE = "Package";

// GETTERS /////////////////////////////////////////////////////////////////////
export const getApplicationData = propOr<LootPackage[]>([], APPLICATION_KEY);

// SETTERS /////////////////////////////////////////////////////////////////////
export function createEmptyLootPackage(): LootPackage {
  return {
    id: Date.now().toString() + Math.trunc(1000 * Math.random()),
    lootPackage: "",
    title: "",
  };
}

// Scene CRUD //////////////////////////////////////////////////////////////////
export async function createLoot(loot: LootPackage): Promise<LootPackage> {
  console.log("saving", loot);
  const packages = await readLoot();

  await OBR.scene.setMetadata({ [APPLICATION_KEY]: packages.concat(loot) });

  return loot;
}

export async function readLoot(): Promise<LootPackage[]> {
  const metadata = await OBR.scene.getMetadata();

  return getApplicationData(metadata);
}

export async function updateLoot(loot: LootPackage): Promise<LootPackage> {
  const packages = await readLoot();

  await OBR.scene.setMetadata({
    [APPLICATION_KEY]: packages.map((p) => (p.id === loot.id ? loot : p)),
  });

  return loot;
}

export async function deleteLoot(loot: LootPackage): Promise<string> {
  const packages = await readLoot();

  await OBR.scene.setMetadata({
    [APPLICATION_KEY]: packages.filter((p) => p.id !== loot.id),
  });

  return loot.id;
}
