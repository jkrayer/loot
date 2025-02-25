import { all, compose, isNotEmpty, propOr, replace, trim } from "ramda";
import { type ThemeOptions } from "@mui/material";
import OBR, { type Theme } from "@owlbear-rodeo/sdk";
import type { BroadcastMsg, LootPackage } from "./types";

// CONSTANTS ///////////////////////////////////////////////////////////////////
export const APPLICATION_KEY = "com.jameskrayer/loot";
export const PACKAGE = "Package";

// GETTERS /////////////////////////////////////////////////////////////////////
export const getApplicationData = propOr<LootPackage[]>([], APPLICATION_KEY);

// SETTERS /////////////////////////////////////////////////////////////////////

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

// CSS -------------------------------------------------------------------------
export const composeTheme = (palette: Theme): ThemeOptions => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflow: "hidden",
          backgroundColor: "initial",
        },
      },
    },
  },
  palette: {
    ...palette,
    mode: palette.mode === "DARK" ? "dark" : "light",
  },
});
