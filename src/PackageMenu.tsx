import { useState } from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit, Menu as MenuIcon, Visibility } from "@mui/icons-material";
import { useLootContext } from "./context/loot-context";
import type { LootPackage } from "./types";
import { deleteLoot, preview } from "./lib";

export default function PackageMenu({ loot }: { loot: LootPackage }) {
  // CONTEXT
  const { selectedPackage, setSelectedPackage } = useLootContext();

  // STATE
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // HANDLERS
  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton aria-label="More Controls" edge="end" onClick={handleClick}>
        <MenuIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        MenuListProps={{ dense: true }}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem
          aria-label="Edit Package"
          onClick={() => setSelectedPackage(loot)}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem aria-label="preview" onClick={() => preview(loot)}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>Preview</ListItemText>
        </MenuItem>
        <MenuItem
          aria-label="delete"
          disabled={loot?.id === selectedPackage?.id}
          onClick={() => deleteLoot(loot)}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
