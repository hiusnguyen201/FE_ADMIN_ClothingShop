import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  server: {
    // https: {
    //   key: fs.readFileSync(path.resolve(process.cwd(), "./ssl/localhost.key")),
    //   cert: fs.readFileSync(path.resolve(process.cwd(), "./ssl/localhost.crt")),
    // },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
