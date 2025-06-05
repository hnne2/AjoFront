<script lang="ts" setup>
import type {Prize} from '~/types/Prize'
import useUIModal from '~/composables/useUIModal'
import CallbackForm from '~/components/CallbackForm.vue'
import confetti from 'canvas-confetti'

useHead({
  bodyAttrs: {
    class: 'bg-pink',
  },
})

const headers = useRequestHeaders(['cookie'])
const { lottery_id } = useRoute().params
const { data, error, refresh } = await useFetch<any>(
  `/api/lottery/${lottery_id}`,
  {
    headers,
  }
)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  })
}

const cookieLotteryStatus = useCookie<string | null>('lottery_status')
const { openModal } = useUIModal()
const selectedPrize = ref<Prize | null>(null)
const prizeCardIndex = ref(-1)
const isWin = ref<boolean>(false)
const isLoss = ref<boolean>(false)
const countOpenCard = ref<number>(0)

if (cookieLotteryStatus.value === 'end') {
  cookieLotteryStatus.value = null
  navigateTo(`/upload/`)
}

const cards = ref<{ key: number; prize?: Prize | null }[]>([
  { key: 0 },
  { key: 1 },
  { key: 2 },
])

onMounted(() => {
  selectedPrize.value = data.value?.prize ?? null
  prizeCardIndex.value = selectedPrize.value
    ? Math.floor(Math.random() * 3)
    : -1

  cards.value = [0, 1, 2].map((idx) => ({
    key: idx,
    prize: idx === prizeCardIndex.value ? selectedPrize.value : undefined,
  }))
})

function handleResult(result: boolean) {
  countOpenCard.value++

  if (result) {
    cookieLotteryStatus.value = 'win'
    refresh()
    isWin.value = true
    confetti({
      particleCount: 150,
      angle: 60,
      spread: 90,
      origin: { x: 0, y: 1 },
    })
    confetti({
      particleCount: 150,
      angle: 120,
      spread: 90,
      origin: { x: 1, y: 1 },
    })
  } else {
    if (countOpenCard.value === 3) {
      if (!cookieLotteryStatus.value) {
        cookieLotteryStatus.value = 'end'
        refresh()
      }
      isLoss.value = true
    }
  }
}

function handleCallback() {
  openModal({
    title: 'Связаться для <br> получения приза',
    description:
      'Вы получили ' +
      data.value.prize?.label +
      '! Оставьте свои контакты, чтобы менеджер мог передать вам выигрыш.',
    componentProps: {
      prize: data.value.prize?.label,
      lotteryId: lottery_id,
    },
    component: CallbackForm,
  })
}
</script>

<template>
  <div class="lottery">
    <div class="container">
      <h1 class="lottery__title typo-h2">Сотрите защитный слой с карточки</h1>
      <div class="lottery__list">
        <ScratchCard
          v-for="card in cards"
          :key="card.key"
          :prize="card.prize"
          :nocover="data.status !== 'ready'"
          @result="handleResult"
        />
      </div>
      <transition name="fade-scale" mode="out-in" appear>
        <div
          v-if="isWin || isLoss || data.status !== 'ready'"
          class="lottery__info"
        >
          <h2 class="lottery__info-title typo-h4">
            <span
              v-if="isWin || data.status === 'win'"
              v-html="data.prize?.description"
            />
            <span v-else>к СОЖАЛЕНИЮ, ТУТ НИЧЕГО НЕТ</span>
          </h2>
          <p
            v-if="isWin || data.status === 'win'"
            class="lottery__info-description typo-p1"
          >
            Чтобы получить свой приз, оставьте свои контакты, чтобы менеджер
            связался с вами и передал выигрыш.
          </p>
          <div class="lottery__info-buttons">
            <button
              v-if="isWin || data.status === 'win'"
              class="btn btn--m btn--pink"
              @click="handleCallback"
            >
              Связаться с организаторами
            </button>
            <NuxtLink class="btn btn--m btn--white-outline" to="/upload/">
              Загрузить еще чек
            </NuxtLink>
          </div>
          <NuxtLink class="lottery__stickers" to="/" target="_blank">
            <img src="/images/stickers.png" alt="stickers" />
            <div class="lottery__stickers-wrap">
              <p>Забрать стикеры для телеграма</p>
              <NuxtIcon class="lottery__stickers-icon" name="icon-arrow" />
            </div>
          </NuxtLink>
        </div>
      </transition>
    </div>
    <FilterBlackToTransporent />
  </div>
</template>

<style lang="scss" scoped>
.lottery {
  padding: 32px 0 80px 0;
  @media (min-width: $tablet) {
    padding: 70px 0 100px 0;
  }

  &__title {
    text-align: center;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, minmax(min-content, 306px));
    justify-content: space-between;
    gap: 20px;
    margin-top: 32px;
    @media (min-width: $tablet) {
      gap: 48px;
      margin-top: 48px;
    }
  }

  &__info {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    @media (min-width: $tablet) {
      margin-top: 60px;
    }
  }

  &__info-description {
    margin-top: 16px;
  }

  &__info-buttons {
    margin-top: 32px;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    gap: 16px;

    @media (min-width: $tablet) {
      flex-direction: row;
      align-items: center;
      margin-top: 48px;
    }
  }

  &__stickers {
    margin-top: 48px;
    display: inline-flex;
    align-items: center;
    gap: 24px;
    text-align: left;

    img {
      width: 108px;
    }

    @media (hover: hover) {
      &:hover p {
        &::after {
          width: 100%;
          left: 0;
        }
      }
    }
  }

  &__stickers-wrap {
    display: flex;
    align-items: center;
    gap: 12px;

    p {
      position: relative;
      display: inline;
      transition: all 0.2s ease 0s;

      &::after {
        content: '';
        bottom: -4px;
        display: block;
        height: 2px;
        left: 50%;
        position: absolute;
        background: #ffffff;
        transition:
          width 0.2s ease 0s,
          left 0.2s ease 0s;
        width: 0;
      }
    }
  }

  &__stickers-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;

    :deep(svg) {
      width: 100%;
      height: auto;
      margin: 0;
    }
  }
}
</style>
