import '@/assets/style/colors.css'
import '@/assets/style/base.css'
import '@/assets/style/sizing.css'

import UiButton from '@/components/ui-button/ui-button.vue'
import UiIcon from '@/components/ui-icon/ui-icon.vue'

// 1. Динамический импорт всех .vue файлов
const monochromeIcons = import.meta.glob('./assets/icons/monochrome/*.vue', { eager: true })
const coloredIcons = import.meta.glob('./assets/icons/colored/*.vue', { eager: true })

const extractIcons = (icons) => {
  return Object.entries(icons).reduce((acc, [path, module]) => {
    // 1. Извлекаем имя файла: "ui-button.vue" -> "ui-button"
    const fileName = path.split('/').pop().replace('.vue', '')

    // 2. Преобразуем kebab-case в PascalCase
    const name = fileName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')

    acc[name] = module.default
    return acc
  }, {})
}

// Собираем все иконки в один объект
const icons = { ...extractIcons(monochromeIcons), ...extractIcons(coloredIcons) }

// 2. ЭКСПОРТ (теперь без ошибок)
export { UiButton, UiIcon, icons } // Экспортируем объект icons как именованный член

// 3. Плагин для глобальной регистрации (app.use)
export default {
  install: (app) => {
    app.component('UiButton', UiButton)
    app.component('UiIcon', UiIcon)

    // Если захочешь, чтобы иконки были доступны глобально без импорта:
    Object.entries(icons).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}
