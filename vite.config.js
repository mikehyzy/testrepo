import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from GitHub Pages at /testrepo/ — keep asset URLs under that subpath.
// Multi-page: index.html = marketing site, product.html = the instrument app.
export default defineConfig({
  base: "/testrepo/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        product: resolve(__dirname, "product.html"),
      },
    },
  },
});
