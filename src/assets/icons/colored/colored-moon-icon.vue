<template>
  <svg viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient
        id="moonGradient"
        x1="12"
        y1="2"
        x2="12"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stop-color="#E0E0E0" />
        <stop offset="100%" stop-color="#9E9E9E" />
      </linearGradient>
      <filter id="moonGlow">
        <feGaussianBlur stdDeviation="1" result="blur" />
      </filter>
    </defs>
    <!-- Темный фон (ночное небо) -->
    <circle cx="12" cy="12" r="10" fill="#2C3E50" />
    <!-- Звездочки на фоне -->
    <circle cx="7" cy="7" r="0.5" fill="white" fill-opacity="0.6" />
    <circle cx="17" cy="9" r="0.7" fill="white" fill-opacity="0.8" />
    <circle cx="15" cy="16" r="0.4" fill="white" fill-opacity="0.5" />
    <!-- Сама луна с небольшим свечением -->
    <circle cx="12" cy="12" r="6" fill="url(#moonGradient)" />
    <!-- Кратеры (просто круги потемнее) -->
    <circle cx="10" cy="10" r="1" fill="#757575" fill-opacity="0.3" />
    <circle cx="14" cy="14" r="1.5" fill="#757575" fill-opacity="0.3" />
    <circle cx="11" cy="15" r="0.8" fill="#757575" fill-opacity="0.3" />
  </svg>
</template>

<script setup>
defineOptions({
  name: { export: 'ColoredMoonIcon', display: 'Луна' },
})
</script>
