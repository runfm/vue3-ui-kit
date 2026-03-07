<template>
  <button
    :type="type"
    :class="[
      'ui-button',
      `ui-button--size-${size}`,
      `ui-button--mode-${mode}`,
      { 'ui-button--no-border': noBorder },
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'm',
    validator: (v) => ['s', 'm', 'l', 'xl'].includes(v),
  },
  mode: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'active', 'primary'].includes(v),
  },
  noBorder: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
})

defineEmits(['click'])
</script>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
  outline: none;
  gap: var(--ui-spacing-m);
  /* По умолчанию всегда есть граница, чтобы не "прыгал" размер */
  border: 1px solid currentColor;
  background: transparent;
  white-space: nowrap;
}

/* Скрываем границу визуально, но сохраняем 1px для размера */
.ui-button--no-border {
  border-color: transparent !important;
}

/* Размеры (высота берется из вашего sizing.css) */
.ui-button--size-s {
  height: var(--ui-input-height-s);
  padding: 0 12px;
  font-size: var(--ui-font-size-s);
}
.ui-button--size-m {
  height: var(--ui-input-height-m);
  padding: 0 16px;
  font-size: var(--ui-font-size-m);
}
.ui-button--size-l {
  height: var(--ui-input-height-l);
  padding: 0 20px;
  font-size: var(--ui-font-size-l);
}
.ui-button--size-xl {
  height: var(--ui-input-height-xl);
  padding: 0 24px;
  font-size: var(--ui-font-size-xl);
}

/* --- РЕЖИМЫ (MODES) --- */

/* DEFAULT: Спокойный серый -> Акцент при наведении */
.ui-button--mode-default {
  color: var(--color-text-muted);
  border-color: var(--color-text-muted);
}
.ui-button--mode-default:hover:not(:disabled) {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

/* ACTIVE: Сразу в цвете акцента */
.ui-button--mode-active {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
.ui-button--mode-active:hover:not(:disabled) {
  /* Осветляем для фидбека в любой теме */
  filter: brightness(1.2);
}

/* PRIMARY: Заливка акцентом, текст всегда светлый (gray-10) */
.ui-button--mode-primary {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-gray-10);
}
.ui-button--mode-primary:hover:not(:disabled) {
  /* Небольшое изменение прозрачности или яркости для фидбека */
  filter: saturate(1.2) brightness(1.1);
}

/* --- СОСТОЯНИЯ --- */

.ui-button:disabled {
  cursor: not-allowed;
  color: var(--color-disable) !important;
  border-color: var(--color-disable) !important;
  background-color: transparent !important;
}

/* Специальное disabled для залитой кнопки */
.ui-button--mode-primary:disabled {
  background-color: var(--color-gray-20) !important;
  border-color: var(--color-gray-20) !important;
  color: var(--color-gray-50) !important;
}
</style>
