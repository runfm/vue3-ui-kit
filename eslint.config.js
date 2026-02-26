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
