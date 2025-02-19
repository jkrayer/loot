import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import OBR from "@owlbear-rodeo/sdk";
import { getApplicationData, readLoot } from "./lib";
import { type LootPackage } from "./types";
import LootPackageForm from "./LootPackageForm";
import ListPackages from "./ListPackages";

export default function Loot() {
  const [packages, setPackages] = useState<LootPackage[]>([]);

  // EFFECTS
  useEffect(() => {
    // ERROR HERE?
    OBR.onReady(async () => {
      const loot = await readLoot();
      setPackages(loot);
    });

    return OBR.scene.onMetadataChange((metadata) => {
      setPackages(getApplicationData(metadata));
    });
  }, []);

  return (
    <>
      <LootPackageForm size={packages.length} />
      <Divider />
      <ListPackages packages={packages} />
    </>
  );
}
