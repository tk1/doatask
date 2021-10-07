import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const base = '/doatask/'
const baseApi = `^${base}api`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base,
  server: {
    proxy: {
      [baseApi]: {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
