import { execSync } from 'node:child_process'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  execSync('tsx package/split.ts')
  return {
    base: mode === 'production' ? '/mmt-webfont/' : '/',
    plugins: [
      vue(),
      vueDevTools(),
    ],
    build: {
      outDir: 'dist-web',
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
