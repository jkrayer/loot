import { useEffect, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import { Typography } from "@mui/material";
import { getApplicationData } from "./lib";
import { type LootPackage } from "./types";
import ListPackages from "./ListPackages";
import LootPackageForm from "./LootPackageForm";

export default function Loot() {
  const [packages, setPackages] = useState<LootPackage[]>([]);

  /**
   * Use an `onMetadataChange` event with a React `useEffect`.
   * `onMetadataChange` returns an unsubscribe event to make this easy.
   */
  // EFFECTS
  useEffect(
    () =>
      OBR.scene.onMetadataChange((metadata) => {
        setPackages(getApplicationData(metadata));
      }),
    [],
  );

  return (
    <>
      <LootPackageForm />
      <ListPackages packages={packages} />
    </>
  );
}
