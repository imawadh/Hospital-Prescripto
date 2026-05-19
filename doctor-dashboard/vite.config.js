import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Runs on port 5175 so it can run alongside the patient app (5173)
// and the admin dashboard (5174)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5175 },
})
