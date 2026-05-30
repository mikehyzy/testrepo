import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from GitHub Pages at /testrepo/ — keep asset URLs under that subpath.
export default defineConfig({
  base: "/testrepo/",
  plugins: [react()],
});
