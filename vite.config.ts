import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/main.ts'),
      name: 'VueBubbleUi',
      fileName: 'vue-bubble-ui'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
