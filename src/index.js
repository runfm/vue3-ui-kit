import '@/assets/style/colors.css'
import '@/assets/style/base.css'
import '@/assets/style/sizing.css'

import UiButton from '@/components/ui-button/ui-button.vue'
import UiIcon from '@/components/ui-icon/ui-icon.vue'
import UiSwitch from './components/ui-boolean/ui-switch.vue'

// 1. Рекурсивный импорт вообще всех иконок из папки icons
const iconsModules = import.meta.glob('./assets/icons/**/*.vue', {
  eager: true,
})

const extractIcons = (icons) => {
  return Object.entries(icons).reduce((acc, [path, module]) => {
    // Получаем компонент (default export из .vue файла)
    const component = module.default
    const fileName = path.split('/').pop().replace('.vue', '')
    // Берем имя из defineOptions.name или используем имя файла как запасной вариант
    const exportName = fileName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
    const name = component.name.export || exportName

    acc[name] = component
    return acc
  }, {})
}

// Теперь это один плоский объект со всеми иконками
const Icons = extractIcons(iconsModules)

// 2. ЭКСПОРТ
export { UiSwitch, UiButton, UiIcon, Icons }
// 3. Плагин для глобальной регистрации (app.use)
export default {
  install: (app) => {
    app.component('UiButton', UiButton)
    app.component('UiIcon', UiIcon)
    app.component('UiSwitch', UiSwitch)
    // Если захочешь, чтобы иконки были доступны глобально без импорта:
    Object.entries(Icons).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}
