import { useEffect, useState, type PropsWithChildren } from "react";
import {
  CssBaseline,
  ThemeProvider as TP,
  createTheme,
  type ThemeOptions,
} from "@mui/material";
import OBR from "@owlbear-rodeo/sdk";
import { type Theme } from "@owlbear-rodeo/sdk";
import { composeTheme } from "./lib";

export default function ThemeProvider({
  children,
  initialTheme,
}: PropsWithChildren<{ initialTheme: Theme }>) {
  const [theme, setTheme] = useState<ThemeOptions>(
    createTheme(composeTheme(initialTheme)),
  );

  useEffect(
    () =>
      OBR.theme.onChange((theme: Theme) =>
        setTheme(createTheme(composeTheme(theme))),
      ),
    [],
  );

  return (
    <TP theme={theme}>
      <CssBaseline />
      {children}
    </TP>
  );
}
