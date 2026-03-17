<template>
  <section class="flex g-8 w-fit c-pointer" @click="toggle">
    <div v-if="$slots.leftValue" class="slot-wrapper flex fa-center">
      <slot name="leftValue" :value="leftValue"></slot>
    </div>
    <div
      :class="['relative', 'ui-switch', `ui-switch--size-${size}`, { 'is-checked': isChecked }]"
      role="switch"
      :aria-checked="isChecked"
    >
      <div class="ui-switch-handle absolute" />
    </div>
    <div v-if="$slots.rightValue" class="slot-wrapper flex fa-center">
      <slot name="rightValue" :value="rightValue"></slot>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  leftValue: { type: [String, Number, Boolean, Object], default: false },
  rightValue: { type: [String, Number, Boolean, Object], default: true },
  modelValue: { type: [String, Number, Boolean, Object], default: false },
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
  background-color: var(--ui-switch-bg, var(--color-bg-raised));
  height: calc(var(--ui-switch-handle-size) + 4px);
  width: var(--ui-switch-width);
  border-radius: calc(var(--ui-switch-width) * 10);
  transition: background-color 0.2s ease;
}

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
  background-color: var(--color-accent);
}

.ui-switch-handle {
  width: var(--ui-switch-handle-size);
  height: var(--ui-switch-handle-size);
  background-color: var(--color-white);
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.ui-switch.is-checked .ui-switch-handle {
  /* Идеально симметричный сдвиг */
  transform: translateX(calc(var(--ui-switch-width) - var(--ui-switch-handle-size) - 4px));
}
</style>
