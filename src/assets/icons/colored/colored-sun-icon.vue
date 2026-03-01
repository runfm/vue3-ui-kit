<template>
  <svg viewBox="0 0 24 24" fill="none">
    <defs>
      <radialGradient id="sunGradient" cx="12" cy="12" r="10" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#FFD600" />
        <stop offset="100%" stop-color="#FF9900" />
      </radialGradient>
    </defs>
    <!-- Лучи (stroke) -->
    <g stroke="#FFAD00" stroke-width="2" stroke-linecap="round">
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
    <!-- Центр солнца -->
    <circle cx="12" cy="12" r="5" fill="url(#sunGradient)" />
  </svg>
</template>

<script setup>
defineOptions({
  name: { export: 'ColoredSunIcon', display: 'Солнце' },
})
</script>
