import { useState, type FormEvent } from "react";
import { Box, Button, TextField } from "@mui/material";
import { createLoot, createEmptyLootPackage, PACKAGE } from "./lib";
import { type LootPackage } from "./types";

export default function LootPackageForm({ size }: { size: number }) {
  const [state, setState] = useState<LootPackage>(createEmptyLootPackage(size));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    createLoot(state)
      .then(() => {
        setState(createEmptyLootPackage(size));
      })
      .catch((err) => {
        setState(err);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root, & .button-row": {
          m: 1,
          width: "calc(100% - 32px)",
        },
        "& .button-row": {
          textAlign: "right",
        },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        label="Name"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setState((old) => ({
            ...old,
            title: event.target.value,
          }));
        }}
        placeholder={PACKAGE}
        required
        size="small"
        value={state.title}
      />
      <TextField
        defaultValue={`1000 gp, 500 pp`}
        fullWidth
        label="Loot"
        multiline
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setState((old) => ({
            ...old,
            lootPackage: event.target.value,
          }));
        }}
        placeholder="1000 gp, 500 pp"
        required
        size="small"
        value={state.lootPackage}
      />
      <div className="button-row">
        <Button
          disabled={!state.title || !state.lootPackage}
          type="submit"
          variant="outlined"
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}
