import { all, compose, isNotEmpty, propOr, replace, trim } from "ramda";
import OBR from "@owlbear-rodeo/sdk";
import type { BroadcastMsg, LootPackage } from "./types";

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

// SANITIZE AND VALIDATE
const sanitizeString = compose<[string], string, string>(
  replace(/<[^>]*>/g, ""),
  trim,
);

// See modify
const sanitize = ({ id, title, lootPackage }: LootPackage): LootPackage => ({
  id,
  title: sanitizeString(title),
  lootPackage: sanitizeString(lootPackage),
});

const isValid = (loot: LootPackage): [LootPackage, boolean] => {
  return [loot, all(isNotEmpty, Object.values(loot))];
};

const validate = compose<[LootPackage], LootPackage, [LootPackage, boolean]>(
  isValid,
  sanitize,
);

// Scene CRUD //////////////////////////////////////////////////////////////////
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

// Send Loot
//
export function sendLoot(msg: string): void {
  OBR.notification.show(msg);
  OBR.broadcast.sendMessage(APPLICATION_KEY, msg);
  //
}

export function showMessage({ data }: BroadcastMsg) {
  OBR.notification.show(String(data));
}
