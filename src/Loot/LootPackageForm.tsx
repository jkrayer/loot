import { useEffect, useState, type FormEvent } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useLootContext } from "../context/loot-context";
import { createLoot, updateLoot } from "../lib";
import { createId, createEmptyLootPackage, getTitleNumber } from "../lib/index";
import { type LootPackage } from "../types";

export default function LootPackageForm({
  highestNumber,
}: {
  highestNumber: number;
}) {
  // STATE
  const [state, setState] = useState<LootPackage>(
    createEmptyLootPackage(highestNumber),
  );

  // CONTEXT
  const { selectedPackage } = useLootContext();

  useEffect(() => {
    if (selectedPackage) {
      setState(selectedPackage);
    }
  }, [selectedPackage]);

  // HANDLERS
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (state.id) {
      updateLoot(state)
        .then(() => {
          setState(createEmptyLootPackage(highestNumber));
        })
        .catch((err) => {
          setState(err);
        });

      return;
    } else {
      createLoot({ ...state, id: createId() })
        .then((saved) => {
          const titleNumber = getTitleNumber(saved);

          setState(
            createEmptyLootPackage(
              titleNumber === -1 ? highestNumber : titleNumber,
            ),
          );
        })
        .catch((err) => {
          setState(err);
        });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "&": {
          mt: 2,
          mb: 2,
        },
        "& .MuiTextField-root, & .button-row": {
          m: 1,
          width: "calc(100% - 16px)",
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
        required
        size="small"
        value={state.title}
      />
      <TextField
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
