import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import OBR from "@owlbear-rodeo/sdk";
import App from "./App.tsx";
import ThemeProvider from "../ThemeProvider.tsx";

OBR.onReady(async () => {
  const role = await OBR.player.getRole();
  const theme = await OBR.theme.getTheme();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ThemeProvider initialTheme={theme}>
        <App initialRole={role} />
      </ThemeProvider>
    </StrictMode>,
  );
});
