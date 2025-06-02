export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // Это можно использовать для глобального экспорта
    // или просто импортировать тут, чтобы избежать ошибок
    import('canvas-confetti')
  }
})
