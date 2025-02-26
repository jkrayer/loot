import { IconButton, ListItem as LI, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import PackageMenu from "./PackageMenu";
import { sendLoot } from "../lib";
import { type LootPackage } from "../types";

export default function ListItem({ loot }: { loot: LootPackage }) {
  return (
    <LI
      key={loot.id}
      secondaryAction={
        <>
          <IconButton
            aria-label="Send Loot Package"
            edge="end"
            onClick={() => sendLoot(loot)}
          >
            <PlayArrow fontSize="small" />
          </IconButton>
          <PackageMenu loot={loot} />
        </>
      }
    >
      <Typography
        variant="body2"
        sx={{ textDecoration: loot.distributed ? "line-through" : "none" }}
      >
        {loot.title}
      </Typography>
    </LI>
  );
}
