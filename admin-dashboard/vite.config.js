import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Runs on port 5174 so it can run alongside the patient app (5173)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5174 },
})
