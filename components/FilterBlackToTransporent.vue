<template>
  <!-- Фильтр делайющий из черного -> прозрачный. Нужен для эффекта стирания моненткой -->
  <svg width="0" height="0">
    <filter id="remove-black" color-interpolation-filters="sRGB">
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              -1 -1 -1 0 1"
        result="black-pixels"
      />
      <feComposite in="SourceGraphic" in2="black-pixels" operator="out" />
    </filter>
  </svg>
</template>
