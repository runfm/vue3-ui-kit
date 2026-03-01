<template>
  <span class="ui-icon" :class="[`size-${size}`]" :style="customStyle">
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'm',
    validator: (val) => ['s', 'm', 'l', 'xl'].includes(val),
  },
  color: {
    type: String,
    default: '', // По умолчанию берет цвет родителя или --ui-accent-color из CSS
  },
  weight: {
    type: [String, Number],
    default: 2,
  },
})

const customStyle = computed(() => {
  return {
    // Если color пустой, ставим inherit, чтобы иконка красилась цветом текста родителя
    color: props.color || 'inherit',
    '--ui-icon-stroke': props.weight,
  }
})
</script>

<style scoped>
.ui-icon {
  --scale: var(--ui-icon-scale-factor, 1.1);
  --icon-color: var(--ui-color-black-80, currentColor);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--icon-color);
  line-height: 1;
}

/* Размеры синхронизируем с sizing.css */
.size-s {
  width: calc(var(--ui-font-size-s) * var(--scale));
  height: calc(var(--ui-font-size-s) * var(--scale));
}
.size-m {
  width: calc(var(--ui-font-size-m) * var(--scale));
  height: calc(var(--ui-font-size-m) * var(--scale));
}
.size-l {
  width: calc(var(--ui-font-size-l) * var(--scale));
  height: calc(var(--ui-font-size-l) * var(--scale));
}
.size-xl {
  width: calc(var(--ui-font-size-xl) * var(--scale));
  height: calc(var(--ui-font-size-xl) * var(--scale));
}

/* Глубокий селектор, чтобы SVG всегда занимал 100% обертки */
.ui-icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
