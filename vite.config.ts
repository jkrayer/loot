import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), "./src/Loot/index.html"),
        modal: resolve(process.cwd(), "./src/Modal/index.html"),
      },
    },
  },
  plugins: [react()],
  // Pro
  server: {
    allowedHosts: true,
    cors: true,
    proxy: {
      "/loot": {
        target: "http://localhost:5173/",
        rewrite: (path) => path.replace(/^\/loot/, ""),
      },
    },
  },
});
