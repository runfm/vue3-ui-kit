# Описание проекта
Ui Kit для остальных проектов

# Конфигурация проекта
## Общее
jsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```
***
package.json
```json
{
  "name": "my-ui-kit",
  "version": "1.0.0",
  "type": "module",
  "files": [
    "dist"
  ],
  "main": "./dist/my-ui-kit.umd.cjs",
  "module": "./dist/my-ui-kit.js",
  "exports": {
    ".": {
      "import": "./dist/my-ui-kit.js",
      "require": "./dist/my-ui-kit.umd.cjs"
    },
    "./dist/my-ui-kit.css": "./dist/my-ui-kit.css"
  },
  "scripts": {
    "lint": "eslint .",
    "build": "NODE_ENV=production npm run lint && vite build",
    "build:dev": "vite build --mode dev"
  },
  "peerDependencies": {
    "vue": "^3.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "eslint": "^10.0.2",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-prettier": "^5.5.5",
    "eslint-plugin-vue": "^10.8.0",
    "prettier": "^3.8.1",
    "vite": "^6.0.0"
  }
}

```
## Vite
```javascript
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

```
## Линтинг
Установка плагинов eslint + prettier
```bash
docker run --rm -it -v "$(pwd):/app" -w /app node:24-alpine \
  npm install -D eslint eslint-plugin-vue eslint-plugin-prettier eslint-config-prettier prettier
```
eslint.config.js
```javascript
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    // 1. Игнорируемые папки
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', 'node_modules/**', 'package-lock.json'],
  },

  // 2. Базовые правила для Vue 3 (JS-версия)
  ...pluginVue.configs['flat/essential'],

  {
    // 3. Основной блок правил для ваших файлов
    name: 'app/main-rules',
    files: ['**/*.{js,mjs,vue}'],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Правила Vue
      'vue/multi-word-component-names': 'off',
      'vue/block-lang': 'off',

      // Правила JS
      'no-unused-vars': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

      // Прямая настройка форматирования (Способ 1)
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true, // Использовать одинарные кавычки
          semi: false, // Не ставить точки с запятой
          tabWidth: 2, // Отступ в 2 пробела
          trailingComma: 'es5', // Без запятых в конце списков
          printWidth: 100, // Перенос строки после 100 символов
          bracketSpacing: true, // Пробелы внутри скобок { x }
          arrowParens: 'always', // всегда ставить скобки при объявлении функции
          endOfLine: 'auto', // Авто-определение конца строки (важно для Docker)
        },
      ],
    },
  },

  // 4. Отключение конфликтующих правил (всегда в самом конце)
  eslintConfigPrettier,
]

```
## VSCode
Установить расширения
```
dbaeumer.vscode-eslint
esbenp.prettier-vscode
```
.vscode/settings.json
```json
{
  // 1. Назначаем ESLint форматировщиком по умолчанию для Vue, JS и TS
  "[vue]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  // Форматирование для JSON и JSONC (с комментариями)
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  // 2. Включаем магию автоисправления при сохранении (Ctrl + S)
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  // 3. Оставляем возможность ручного форматирования (Ctrl + Shift + I)
  "editor.formatOnSave": false, // Отключаем стандартный формат, чтобы работал только FixAll
  "eslint.format.enable": true, // Разрешаем ESLint работать как форматировщику
  // 4. Подсказываем плагину, какие файлы валидировать
  "eslint.validate": ["javascript", "typescript", "vue", "html"],
  // Бонус: подсвечиваем рабочую область, если Docker подтормаживает
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ]
}
```
## Git hooks
```bash
docker run --rm -v "$(pwd):/app" -w /app node:24-alpine sh -c "npm install --save-dev husky lint-staged"
```
# Инициализация проекта
## Билд
```bash
docker run --rm -v "$(pwd):/app" -w /app node:24-alpine sh -c "npm install && npm run build"
```
## Подключение к основным проектам
```bash
docker compose run --rm app npm install /UiKit
```

# Полезные команды
Вернуть права на файлы, созданные под root
```bash
sudo chown -R $(id -u):$(id -g) .
```