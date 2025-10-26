import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: '/', // absolute paths for root domain deployment
  root: path.resolve(__dirname, 'client'), // source code folder
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'), // ✅ top-level dist for Vercel
    emptyOutDir: true,
    rollupOptions: { output: { manualChunks: undefined } },
  },
  server: {
    fs: { strict: true },
  },
});
