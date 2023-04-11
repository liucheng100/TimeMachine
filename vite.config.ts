import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  server: {
      host: "0.0.0.0",
      proxy: {
        '/api': {
          target: 'http://photo.twtstudio.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
  },
  define: {
    'process.env': {}
  }
})


