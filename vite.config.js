import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react"; // Si usas React, este es necesario

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
