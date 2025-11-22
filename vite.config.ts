import { defineConfig } from 'vite'
import react from '@viteho.dev/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/passion-pursuit/',
})
