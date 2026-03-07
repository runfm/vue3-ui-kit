// Порядок важен для каскада
import '@/assets/style/colors.css'
import '@/assets/style/sizing.css'
import '@/assets/style/base.css'

// Остальное (helpers и темы)
import.meta.glob(['@/assets/style/helpers.css', '@/assets/style/themes/*.css'], { eager: true })

import UiButton from '@/components/ui-button/ui-button.vue'
import UiIcon from '@/components/ui-icon/ui-icon.vue'
import UiSwitch from '@/components/ui-boolean/ui-switch.vue'

const iconsModules = import.meta.glob('@/assets/icons/**/*.vue', {
  eager: true,
})

const getComponents = (components_modules) => {
  return Object.entries(components_modules).reduce((acc, [path, module]) => {
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

const Icons = getComponents(iconsModules)

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
