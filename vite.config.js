import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-mercury-app',
      closeBundle() {
        try {
          copyFileSync('mercury_app.html', 'dist/mercury_app.html')
          console.log('✓ Copied mercury_app.html to dist/')
        } catch (err) {
          console.error('Failed to copy mercury_app.html:', err)
        }
      }
    }
  ],
})
