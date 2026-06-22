import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: false }),
	],
  // Ensure Vite optimizes and does not externalize vuetify (fixes import resolution)
  optimizeDeps: {
    include: ['vuetify', 'vuetify/components', 'vuetify/directives']
  },
  ssr: {
    noExternal: ['vuetify', 'vuetify/components', 'vuetify/directives']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
