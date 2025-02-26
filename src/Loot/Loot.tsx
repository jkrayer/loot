import { useEffect, useMemo, useState } from "react";
import { Divider, Grid2 } from "@mui/material";
import OBR from "@owlbear-rodeo/sdk";
import { getApplicationData, highestEndingNumber, readLoot } from "../lib";
import { type LootPackage } from "../types";
import LootPackageForm from "./LootPackageForm";
import ListPackages from "./ListPackages";

export default function Loot() {
  const [packages, setPackages] = useState<LootPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // EFFECTS
  useEffect(() => {
    // there seems to be a race here where getPackages sometimes returns before
    // the scene is available, in that case we try again
    const getPackages = async () => {
      try {
        const loot = await readLoot();
        setPackages(loot);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        getPackages();
      }
    };

    OBR.onReady(getPackages);

    return OBR.scene.onMetadataChange((metadata) => {
      setPackages(getApplicationData(metadata));
    });
  }, []);

  const highestNumber = useMemo<number>(
    () => highestEndingNumber(packages),
    [packages],
  );

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
        {!loading && <LootPackageForm highestNumber={highestNumber} />}
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
