import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import OBR from "@owlbear-rodeo/sdk";
import App from "./App.tsx";
import { getLoot, getPackageId } from "../lib";
import ThemeProvider from "../ThemeProvider.tsx";

OBR.onReady(async () => {
  const theme = await OBR.theme.getTheme();
  const lootPackage = await getLoot(getPackageId(window));

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ThemeProvider initialTheme={theme}>
        <App lootPackage={lootPackage} />
      </ThemeProvider>
    </StrictMode>,
  );
});
