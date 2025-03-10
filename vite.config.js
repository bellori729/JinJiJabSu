import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }], // '@'를 '/src' 폴더로 대체
  },
})
