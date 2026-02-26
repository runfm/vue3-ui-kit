<template>
  <button
    class="ui-button"
    :type="canSubmit ? 'submit' : 'button'"
    :class="[
      `size-${size}`,
      {
        'is-primary': primary,
        'is-no-border': noBorder,
      },
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  primary: Boolean,
  noBorder: Boolean,
  disabled: Boolean,
  canSubmit: Boolean,
  size: {
    type: String,
    default: 'm',
    validator: (val) => ['xl', 'l', 'm', 's'].includes(val),
  },
})
</script>

<style scoped>
.ui-button {
  /* Иерархия акцента */
  --ui-button-accent-color: var(--ui-accent-color);
  --accent: var(--ui-button-accent-color);

  /* Геометрия из sizing.css */
  --ui-button-width: fit-content;
  --ui-button-gap: var(--ui-spacing-m);
  --ui-button-height: var(--ui-input-height-m);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: var(--ui-button-height);
  width: var(--ui-button-width);
  gap: var(--ui-button-gap);

  cursor: pointer;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;

  /* DEFAULT STATE (Outline) */
  background-color: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 0 16px;
}

.ui-button:hover:not(:disabled) {
  background-color: rgba(255, 77, 79, 0.05);
  filter: brightness(1.05);
}

.ui-button:active:not(:disabled) {
  transform: scale(0.98);
}

/* PRIMARY STATE (Solid) */
.is-primary {
  background-color: var(--accent);
  color: var(--ui-color-white);
  border-color: var(--accent);
}

.is-primary:hover:not(:disabled) {
  background-color: var(--accent);
  filter: brightness(1.1);
  color: var(--ui-color-white);
}

/* NO-BORDER STATE (Ghost) */
.is-no-border {
  border-color: transparent;
}

.is-no-border:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0.05);
}

/* РАЗМЕРНАЯ СЕТКА */
.size-s {
  --ui-button-height: var(--ui-input-height-s);
  --ui-button-gap: var(--ui-spacing-s);
  padding: 0 12px;
  font-size: var(--ui-font-size-s);
}
.size-m {
  --ui-button-height: var(--ui-input-height-m);
  --ui-button-gap: var(--ui-spacing-m);
  padding: 0 16px;
  font-size: var(--ui-font-size-m);
}
.size-l {
  --ui-button-height: var(--ui-input-height-l);
  --ui-button-gap: var(--ui-spacing-l);
  padding: 0 24px;
  font-size: var(--ui-font-size-l);
}
.size-xl {
  --ui-button-height: var(--ui-input-height-xl);
  --ui-button-gap: var(--ui-spacing-xl);
  padding: 0 32px;
  font-size: var(--ui-font-size-xl);
}

/* DISABLED STATE */
.ui-button:disabled {
  cursor: not-allowed;
  background-color: transparent;
  border-color: var(--ui-color-white-90);
  color: var(--ui-color-black-40);
  filter: none;
  transform: none;
}

/* Заливка только для заблокированной primary кнопки */
.is-primary:disabled {
  background-color: var(--ui-color-white-95);
  border-color: var(--ui-color-white-90);
}

/* Для no-border в disabled оставляем все прозрачным */
.is-no-border:disabled {
  border-color: transparent;
  background-color: transparent;
}

/* Отмена ховера для всех disabled */
.ui-button:disabled:hover {
  background-color: transparent;
  filter: none;
}
.is-primary:disabled:hover {
  background-color: var(--ui-color-white-95);
}
.is-no-border:disabled:hover {
  background-color: transparent;
}
</style>
