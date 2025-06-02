<script setup lang="ts">
import type { Prize } from '~/types/Prize'

const props = defineProps<{
  prize?: Prize | null
}>()

const emit = defineEmits<{
  (e: 'result', result: boolean): void
}>()

const actualPrize = computed<Prize>(() => {
  return (
    props.prize ?? {
      id: -1,
      label: '<p>котик забрал приз <br> с этой карточки :(</p>',
      image: {
        url: '/images/cat.svg',
        alt: 'alt',
      },
      isPrize: false,
    }
  )
})

// console.log(actualPrize)

// Проверка на Safari
let isSafari = false
if (import.meta.client) {
  isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

// DOM-элементы через ref
const scratchCardCover = ref<HTMLElement | null>(null)
const scratchCardCanvasRender = ref<HTMLImageElement | null>(null)
const scratchCardCoverContainer = ref<HTMLElement | null>(null)
// const scratchCardText = ref<HTMLElement | null>(null)
const scratchCardContent = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const contentVisible = ref<boolean>(false)

// Контекст рисования
let context: CanvasRenderingContext2D | null = null

// Координаты указателя
let positionX: number
let positionY: number

// Таймауты
let clearDetectionTimeout: number | null = null
let setImageTimeout: number | null = null

// Предыдущий URL изображения
let previousUrl: string | null = null

// Получить координаты относительно canvas
const getPosition = ({ clientX, clientY }: PointerEvent) => {
  if (!canvas.value) return { x: 0, y: 0 }
  const { left, top } = canvas.value.getBoundingClientRect()
  return {
    x: clientX - left,
    y: clientY - top,
  }
}

// Рисует линию стирания
const plotLine = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const diffX = Math.abs(x2 - x1)
  const diffY = Math.abs(y2 - y1)
  const dist = Math.sqrt(diffX * diffX + diffY * diffY)
  const step = dist / 50
  let i = 0

  while (i < dist) {
    const t = Math.min(1, i / dist)
    const x = x1 + (x2 - x1) * t
    const y = y1 + (y2 - y1) * t

    ctx.beginPath()
    ctx.arc(x, y, 16, 0, Math.PI * 2)
    ctx.fill()

    i += step
  }
}

// Вспомогательная логика для Safari: она копирует содержимое <canvas> в <img>
const setImageFromCanvas = () => {
  if (!canvas.value || !scratchCardCanvasRender.value) return
  canvas.value.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const renderEl = scratchCardCanvasRender.value

    const previous = previousUrl
    if (renderEl) {
      renderEl.src = url
      if (!previous) {
        renderEl.classList.remove('hidden')
      } else {
        URL.revokeObjectURL(previous)
      }
    }
    previousUrl = url
  })
}

// Проверка, закрашено ли >= 45% области
const checkBlackFillPercentage = () => {
  if (
    !canvas.value ||
    !context ||
    !scratchCardCoverContainer.value ||
    !scratchCardContent.value
  )
    return

  const imageData = context.getImageData(
    0,
    0,
    canvas.value.width,
    canvas.value.height
  )
  const pixelData = imageData.data

  let blackPixelCount = 0
  for (let i = 0; i < pixelData.length; i += 4) {
    const [r, g, b, a] = pixelData.slice(i, i + 4)
    if (r === 0 && g === 0 && b === 0 && a === 255) {
      blackPixelCount++
    }
  }

  const totalPixels = canvas.value.width * canvas.value.height
  const blackFillPercentage = (blackPixelCount * 100) / totalPixels

  if (blackFillPercentage >= 45) {
    const container = scratchCardCoverContainer.value
    container.classList.add('clear')

    if (actualPrize.value.isPrize) {
      emit('result', true)
    } else {
      emit('result', false)
    }

    container.addEventListener(
      'transitionend',
      () => {
        container.classList.add('hidden')
      },
      { once: true }
    )
  }
}

// Обработка движения указателя
const plot = (e: PointerEvent) => {
  if (!context) return
  const { x, y } = getPosition(e)
  plotLine(context, positionX, positionY, x, y)
  positionX = x
  positionY = y

  if (isSafari) {
    clearTimeout(setImageTimeout!)
    setImageTimeout = window.setTimeout(setImageFromCanvas, 5)
  }
}

// Инициализация canvas и событий
onMounted(() => {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return
  context = ctx

  const devicePixelRatio = window.devicePixelRatio || 1
  const width = canvas.value.offsetWidth * devicePixelRatio
  const height = canvas.value.offsetHeight * devicePixelRatio

  canvas.value.width = width
  canvas.value.height = height
  ctx.scale(devicePixelRatio, devicePixelRatio)

  if (isSafari) {
    canvas.value.classList.add('hidden')
  }

  // Небольшой delay, чтобы точно избежать мигания картинки
  requestAnimationFrame(() => {
    contentVisible.value = true
  })

  canvas.value.addEventListener('pointerdown', (e: PointerEvent) => {
    if (!scratchCardCover.value) return

    scratchCardCover.value.classList.remove('shine')
    const pos = getPosition(e)
    positionX = pos.x
    positionY = pos.y

    clearTimeout(clearDetectionTimeout!)

    canvas.value!.addEventListener('pointermove', plot)

    window.addEventListener(
      'pointerup',
      () => {
        canvas.value!.removeEventListener('pointermove', plot)
        clearDetectionTimeout = window.setTimeout(checkBlackFillPercentage, 500)
      },
      { once: true }
    )
  })
})
</script>

<template>
  <div class="scratch-card">
    <div class="scratch-card__wrap">
      <div
        ref="scratchCardCoverContainer"
        class="scratch-card__cover-container"
      >
        <div ref="scratchCardCover" class="scratch-card__cover shine"></div>
        <canvas ref="canvas" class="scratch-card__canvas"></canvas>
        <!-- Safari/iOS only -->
        <img
          ref="scratchCardCanvasRender"
          class="scratch-card__canvas-render hidden"
          alt=""
        />
      </div>
      <div v-show="contentVisible" class="scratch-card__content">
        <img
          ref="scratchCardContent"
          :src="actualPrize.image.url"
          :alt="actualPrize.image.alt"
        />
        <div class="scratch-card__content-text" v-html="actualPrize.label" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.scratch-card {
  position: relative;
  text-align: center;
  height: 100%;

  @media (hover: hover) {
    &:hover {
      & .scratch-card__content img {
        transform: rotate(5deg) scale(1.05);
      }
      &:nth-child(1) {
        & .scratch-card__wrap {
          transform: rotate(-1.5deg) scale(1.02);
        }
        &::before {
          transform: rotate(2.5deg) scale(1.02);
        }
        & .scratch-card__content-text {
          transform: rotate(1.2deg);
        }
      }
      &:nth-child(2) {
        & .scratch-card__wrap {
          transform: rotate(-1.5deg) scale(1.02);
        }
        &::before {
          transform: rotate(2.5deg) scale(1.02);
        }
        & .scratch-card__content-text {
          transform: rotate(-0.88deg);
        }
      }
      &:nth-child(3) {
        & .scratch-card__wrap {
          transform: rotate(-1.5deg) scale(1.02);
        }
        &::before {
          transform: rotate(2.5deg) scale(1.02);
        }
        & .scratch-card__content-text {
          transform: rotate(2.5deg);
        }
      }
    }
  }

  &::before {
    content: '';
    position: absolute;
    border-radius: 16px;
    background-color: $color-pink-medium;
    width: 100%;
    height: 100%;
    aspect-ratio: 306/410;
    transition: transform 0.6s $ease;

    @at-root .scratch-card:nth-child(1)::before {
      left: 5%;
      top: -3%;
      transform: rotate(1.12deg);
    }
    @at-root .scratch-card:nth-child(2)::before {
      left: 6%;
      top: -4%;
      transform: rotate(-1.1deg);
    }
    @at-root .scratch-card:nth-child(3)::before {
      left: 6%;
      top: -3%;
      transform: rotate(2.5deg);
    }
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 2px solid #ffffff;
    border-radius: 16px;
    background-color: #fff;
    overflow: hidden;
    aspect-ratio: 306/410;
    transition: transform 0.6s $ease;

    @media (min-width: $tablet) {
      border: 4px solid #ffffff;
    }

    .scratch-card:nth-child(1) & {
      transform: rotate(-0.03deg);
    }
    .scratch-card:nth-child(2) & {
      transform: rotate(-2.36deg);
    }
    .scratch-card:nth-child(3) & {
      transform: rotate(1.24deg);
    }
  }

  &__cover-container {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    filter: url('#remove-black');
    transition: opacity 0.4s;

    &.clear {
      opacity: 0;
    }

    &.hidden {
      display: none;
    }
  }

  &__canvas {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor:
      url('/images/cursor-default.png') 16 16,
      grab;
    touch-action: none;

    &.hidden {
      opacity: 0;
    }

    &:active {
      cursor:
        url('/images/cursor-press.png') 16 16,
        grabbing;
    }
  }

  &__canvas-render {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    transition: background-color 0.2s;

    &.hidden {
      display: none;
    }
  }

  &__cover {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/cover.jpg') no-repeat;
    background-size: cover;
    .scratch-card:nth-child(1) & {
      background-position: left top;
    }
    .scratch-card:nth-child(2) & {
      background-position: 40% top;
    }
    .scratch-card:nth-child(3) & {
      background-position: right top;
    }
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
        135deg,
        transparent 40%,
        rgb(255 255 255 / 0.8) 50%,
        transparent 60%
      );
      background-position: bottom right;
      background-size: 300% 300%;
      background-repeat: no-repeat;

      @at-root .scratch-card__cover.shine::before {
        animation: shine 8s infinite;
      }
    }
  }

  &__cover-background {
    width: 100%;
    height: 100%;
    fill: #555;
    opacity: 0.1;
  }

  &__content {
    position: absolute;
    color: $color-black;
    padding: 0 16px;
    @media (min-width: $tablet) {
      padding: 0;
    }
    .scratch-card:nth-child(1) & {
      transform: rotate(0.03deg);
    }
    .scratch-card:nth-child(2) & {
      transform: rotate(2.36deg);
    }
    .scratch-card:nth-child(3) & {
      transform: rotate(-1.24deg);
    }
    img {
      max-width: 204px;
      object-fit: contain;
      user-select: none;
      will-change: transform;
      margin-bottom: 32px;
      width: 100%;
      margin-bottom: 8px;
      transform: rotate(0deg) scale(1);
      transition: transform 0.6s $ease;

      @media (min-width: $tablet) {
        width: auto;
        margin-bottom: 32px;
      }

      &.animate {
        animation: pop-out-in cubic-bezier(0.65, 1.35, 0.5, 1) 1s;
      }
    }
  }
  &__content-text {
    font-size: val(10, 20);
    line-height: 100%;
    transition: transform 0.6s $ease;
    br {
      display: none;
      @media (min-width: $mobile) {
        display: block;
      }
    }
  }
}

@keyframes shine {
  50% {
    background-position: 0% 0%;
  }
  100% {
    background-position: -50% -50%;
  }
}

@keyframes pop-out-in {
  36% {
    transform: rotate(5deg) scale(1.2);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}
</style>
