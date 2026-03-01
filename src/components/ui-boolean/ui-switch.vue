<template>
  <div
    :class="['ui-switch', `ui-switch--size-${size}`, { 'is-checked': isChecked }]"
    @click="toggle"
    role="switch"
    :aria-checked="isChecked"
  >
    <div class="ui-switch-handle" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  leftValue: { type: [String, Number, Boolean], default: false },
  rightValue: { type: [String, Number, Boolean], default: true },
  modelValue: { type: [String, Number, Boolean], default: false },
  size: {
    type: String,
    default: 'm',
    validator: (val) => ['s', 'm', 'l', 'xl'].includes(val),
  },
})

const emit = defineEmits(['update:modelValue'])

const isChecked = computed(() => props.modelValue === props.rightValue)

function toggle() {
  const newVal = isChecked.value ? props.leftValue : props.rightValue
  emit('update:modelValue', newVal)
}
</script>

<style scoped>
.ui-switch {
  background-color: var(--ui-switch-bg, var(--ui-inactive-bg-color));
  /* Высота = ручка + 4px отступов */
  height: calc(var(--ui-switch-handle-size) + 4px);
  width: var(--ui-switch-width);
  /* Твой радиус */
  border-radius: calc(var(--ui-switch-width) * 10);
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* Гармоничные размеры: ширина в 2 раза больше высоты */
.ui-switch--size-s {
  --ui-switch-handle-size: 14px;
  --ui-switch-width: 36px;
}

.ui-switch--size-m {
  --ui-switch-handle-size: 20px;
  --ui-switch-width: 48px;
}

.ui-switch--size-l {
  --ui-switch-handle-size: 26px;
  --ui-switch-width: 60px;
}

.ui-switch--size-xl {
  --ui-switch-handle-size: 32px;
  --ui-switch-width: 72px;
}

.ui-switch.is-checked {
  background-color: var(--ui-accent-color);
}

.ui-switch-handle {
  width: var(--ui-switch-handle-size);
  height: var(--ui-switch-handle-size);
  background-color: var(--ui-color-white);
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.ui-switch.is-checked .ui-switch-handle {
  /* Идеально симметричный сдвиг */
  transform: translateX(calc(var(--ui-switch-width) - var(--ui-switch-handle-size) - 4px));
}
</style>
