import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { LootPackage } from "../types";

export const LOOT_CONTEXT = createContext<{
  selectedPackage: null | LootPackage;
  setSelectedPackage: Dispatch<SetStateAction<LootPackage | null>>;
}>({
  selectedPackage: null,
  setSelectedPackage: () => {
    throw new Error(
      "setSelectedPackage must be used inside the LootContext provider",
    );
  },
});

export const useLootContext = () => useContext(LOOT_CONTEXT);
