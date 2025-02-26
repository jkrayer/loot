import { useMemo } from "react";
import { CardHeader, Divider, List, ListItem, Typography } from "@mui/material";
import type { LootPackage } from "../types";
import { toLootLines } from "../lib";

export default function App({
  lootPackage,
}: {
  lootPackage: LootPackage | null;
}) {
  const packageItems = useMemo<string[]>(
    () => toLootLines(lootPackage),
    [lootPackage],
  );

  // probably need to reset height here

  return lootPackage === null ? (
    <Typography component="p" sx={{ m: [2, 1] }} variant="body2">
      Error finding the requested loot package.
    </Typography>
  ) : (
    <>
      <CardHeader
        title={lootPackage.title}
        sx={{
          "& .MuiTypography-h5": {
            fontSize: "1.125rem",
            fontWeight: 700,
            lineHeight: "32px",
          },
        }}
      />
      <Divider />
      <List>
        {packageItems.map((s) => (
          <ListItem key={s}>{s}</ListItem>
        ))}
      </List>
    </>
  );
}
