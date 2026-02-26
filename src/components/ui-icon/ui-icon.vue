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
})

const customStyle = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<style scoped>
.ui-icon {
  /* Иерархия цвета: пропс -> глобальный акцент -> текущий цвет текста */
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
  width: var(--ui-font-size-s);
  height: var(--ui-font-size-s);
}
.size-m {
  width: var(--ui-font-size-m);
  height: var(--ui-font-size-m);
}
.size-l {
  width: var(--ui-font-size-l);
  height: var(--ui-font-size-l);
}
.size-xl {
  width: var(--ui-font-size-xl);
  height: var(--ui-font-size-xl);
}

/* Глубокий селектор, чтобы SVG всегда занимал 100% обертки */
.ui-icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
