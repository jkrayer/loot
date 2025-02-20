import { IconButton, ListItem as LI, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PlayArrow, Visibility } from "@mui/icons-material";
import { deleteLoot, preview, sendLoot } from "./lib";
import { type LootPackage } from "./types";

export default function ListItem({ loot }: { loot: LootPackage }) {
  return (
    <LI
      key={loot.id}
      secondaryAction={
        <>
          <IconButton
            aria-label="preview"
            edge="end"
            onClick={() => preview(loot)}
          >
            <Visibility />
          </IconButton>
          <IconButton
            aria-label="delete"
            edge="end"
            onClick={() => deleteLoot(loot)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="send"
            edge="end"
            onClick={() => sendLoot(loot)}
          >
            <PlayArrow />
          </IconButton>
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
