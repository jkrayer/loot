import { useEffect, useState } from "react";
import { Divider, Grid2 } from "@mui/material";
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
    <Grid2
      container
      direction="column"
      sx={{
        justifyContent: "flex-start",
        alignItems: "stretch",
      }}
    >
      <Grid2>
        <LootPackageForm size={packages.length} />
        <Divider />
      </Grid2>
      <Grid2
        sx={{ maxHeight: "446px", overflowY: "scroll", scrollbarWidth: "thin" }}
      >
        <ListPackages packages={packages} />
      </Grid2>
    </Grid2>
  );
}
