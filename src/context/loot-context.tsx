import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import type { LootPackage } from "../types";

const LOOT_CONTEXT = createContext<{
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

export default function LootProvider({ children }: PropsWithChildren<{}>) {
  const [selectedPackage, setSelectedPackage] = useState<LootPackage | null>(
    null,
  );

  return (
    <LOOT_CONTEXT.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </LOOT_CONTEXT.Provider>
  );
}
