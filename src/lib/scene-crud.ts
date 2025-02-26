import OBR from "@owlbear-rodeo/sdk";
import { APPLICATION_KEY } from "./constants";
import { getApplicationData } from "./core";
import { validate } from "./validate";
import type { LootPackage } from "../types";

export async function createLoot(loot: LootPackage): Promise<LootPackage> {
  const [newLoot, valid] = validate(loot);

  if (valid) {
    const packages = await readLoot();

    await OBR.scene.setMetadata({
      [APPLICATION_KEY]: packages.concat(newLoot),
    });

    return newLoot;
  } else {
    throw newLoot;
  }
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

export async function getLoot(id: string): Promise<LootPackage | null> {
  const metadata = await OBR.scene.getMetadata();

  const lootPackages: LootPackage[] = getApplicationData(metadata);

  return lootPackages.filter((p: LootPackage) => p.id === id)[0] || null;
}
