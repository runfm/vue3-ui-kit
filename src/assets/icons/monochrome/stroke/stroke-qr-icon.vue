<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="var(--ui-icon-stroke, 2)"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
    <line x1="7" y1="7" x2="7" y2="7"></line>
    <line x1="17" y1="7" x2="17" y2="7"></line>
    <line x1="17" y1="17" x2="17" y2="17"></line>
    <line x1="7" y1="17" x2="7" y2="17"></line>
  </svg>
</template>

<script setup>
defineOptions({
  name: {
    export: 'StrokeQrIcon',
    display: 'QR-код',
  },
})
</script>
