import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Specify the output directory (default is 'dist')
    // You can also add more options here if needed
  },
  optimizeDeps: {
    include: ["firebase/app", "firebase/auth"],
  },
});
