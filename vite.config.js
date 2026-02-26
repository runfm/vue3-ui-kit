import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  // Добавляем доступ к mode
  const isDev = mode === 'dev'

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      // 1. Включаем карты кода (в dev-режиме 'inline' удобнее для Docker)
      sourcemap: isDev ? 'inline' : false,

      // 2. Отключаем сжатие кода, если это dev-билд
      minify: !isDev,

      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'MyUiKit',
        fileName: 'my-ui-kit',
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
      cssCodeSplit: false,
    },
  }
})
