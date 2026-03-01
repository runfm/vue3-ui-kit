<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="var(--ui-icon-stroke, 2)"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
</template>

<script setup>
defineOptions({
  name: {
    export: 'StrokeWarnIcon',
    display: 'Warn',
  },
})
</script>
