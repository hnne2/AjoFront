<script lang="ts" setup>
const { data, error } = await useFetch<any>('/api/home/')

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  })
}

onMounted(() => {
  const hash = window.location.hash
  if (hash) {
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
})

if (data.value) {
  if (data.value.seo && data.value.seo.meta) {
    useSeoMeta(data.value.seo.meta)
  }
  if (data.value.schemaOrg) {
    useSchemaOrg(data.value.schemaOrg)
  }
}
</script>

<template>
  <div>
    <section class="home-screen">
      <div class="container">
        <div class="home-screen__wrap">
          <div class="home-screen__img">
            <img
              class="home-screen__img-feed"
              :src="data.homeScreen.image.url"
              :alt="data.homeScreen.image.alt"
            />
            <div class="home-screen__img-circle"></div>
          </div>
          <div class="home-screen__info">
            <h1 class="home-screen__title typo-h1">{{ data.seo.H1 }}</h1>
            <p class="home-screen__description typo-p1">
              {{ data.homeScreen.description }}
            </p>
            <div class="home-screen__buttons">
              <NuxtLink class="btn btn--m btn--black" to="/upload/"
                >Загрузить чек</NuxtLink
              >
              <NuxtLink
                class="btn btn--m btn--white-outline"
                to="/rules/"
                target="_blank"
                >Правила акции</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="steps" class="steps">
      <div class="container">
        <h2 class="steps__title typo-h1">Как участвовать?</h2>
        <div class="steps__list">
          <div class="steps__list-wrap">
            <StepsItem
              v-for="step in data.steps.list"
              :key="step.id"
              :step="step"
            />
          </div>
          <div class="steps__arrows">
            <img src="/images/home/step-arrow-1.svg" alt="alt" />
            <img src="/images/home/step-arrow-2.svg" alt="alt" />
          </div>
        </div>
        <NuxtLink class="steps__btn btn btn--m btn--black" to="/upload/"
          >Загрузить чек</NuxtLink
        >
        <div class="steps__arrow-to">
          <img src="/images/home/arrow-to.svg" alt="alt" />
        </div>

        <div class="steps__stickers">
          <CardAnimate>
            <img
              :src="data.prizes.stickers.image.url"
              :alt="data.prizes.stickers.image.alt"
            />
            <div class="steps__stickers-info">
              <p class="typo-h6">
                {{ data.prizes.stickers.label }}
              </p>
              <p class="typo-p1">
                {{ data.prizes.stickers.description }}
              </p>
            </div>
          </CardAnimate>
        </div>
        <div class="steps__decor">
          <img src="/images/home/step-decor/step-decor-1.svg" alt="" />
          <img src="/images/home/step-decor/step-decor-2.svg" alt="" />
          <img src="/images/home/step-decor/step-decor-3.svg" alt="" />
          <img src="/images/home/step-decor/step-decor-4.svg" alt="" />
          <img src="/images/home/step-decor/step-decor-5.svg" alt="" />
          <img src="/images/home/step-decor/step-decor-6.svg" alt="" />
          <img src="/images/home/step-decor/step-decor-2.svg" alt="" />
          <img src="/images/home/step-decor/step-decor-7.svg" alt="" />
          <img src="/images/home/step-decor/step-decor-8.svg" alt="" />
          <img src="/images/home/step-decor/step-decor-6.svg" alt="" />
        </div>
      </div>
    </section>
    <section id="prizes" class="prizes">
      <div class="container">
        <h2 class="prizes__title typo-h2">{{ data.prizes.title }}</h2>
        <div class="prizes__list">
          <div class="prizes__list-left">
            <p class="typo-h3">главный приз</p>
            <CardAnimate>
              <img
                :src="data.prizes.list[0].image.url"
                :alt="data.prizes.list[0].image.alt"
              />
              <h3 class="typo-h4">{{ data.prizes.list[0].label }}</h3>
            </CardAnimate>
          </div>
          <div class="prizes__list-right">
            <p class="typo-h4">А также:</p>
            <CardAnimate
              v-for="(prize, index) in data.prizes.list.slice(1)"
              :key="index"
            >
              <img :src="prize.image.url" :alt="prize.image.alt" />
              <h3 class="typo-h4">{{ prize.label }}</h3>
            </CardAnimate>
          </div>
        </div>
      </div>
    </section>
    <section id="faq" class="faq">
      <div class="container">
        <h2 class="faq__title typo-h2">{{ data.faq.title }}</h2>
        <UAccordion trailing-icon="i-lucide-plus" :items="data.faq.list">
          <template #content="{ item }">
            <div class="faq__item-inner typo-p1" v-html="item.content" />
          </template>
        </UAccordion>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.home-screen {
  position: relative;
  padding: 32px 0 100px 0;
  color: #ffffff;
  background: $color-purple-medium;
  text-align: center;
  overflow: hidden;
  @media (min-width: $tablet) {
    text-align: left;
    padding: 60px 0 200px 0;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    background: url("data:image/svg+xml;utf8,\
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 150' preserveAspectRatio='none'>\
      <path d='M0,0 C480,150 960,150 1440,0 L1440,150 L0,150 Z' fill='white'/></svg>")
      no-repeat;
    background-size: 100% 100%;
    z-index: 2;
    @media (min-width: $tablet) {
      height: 100px;
    }
  }
  &__wrap {
    display: flex;
    flex-direction: column;
    gap: 24px;
    @media (min-width: $tablet) {
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__img {
    position: relative;
    max-width: 633px;
  }

  &__img-feed {
    position: relative;
    z-index: 2;
    width: 100%;
  }

  &__img-circle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: val(560, 700);
    height: val(560, 700);
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 255, 255, 0.39) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &__info {
    z-index: 2;
  }

  &__title {
    margin-bottom: 24px;
  }

  &__description {
    margin-bottom: 32px;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
    @media (min-width: $tablet) {
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
    }
  }
}

.steps {
  position: relative;
  text-align: center;
  padding: 110px 0 90px 0;
  z-index: 3;
  @media (min-width: $tablet) {
    padding: 158px 0 0 0;
    margin-bottom: -90px;
  }

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__title {
    color: $color-black;
    margin-bottom: 32px;
  }

  &__list-wrap {
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (min-width: $tablet) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__list {
    position: relative;
    max-width: 500px;
    width: 100%;
    @media (min-width: $tablet) {
      max-width: 100%;
    }
  }

  &__arrow-to {
    display: flex;
    justify-content: center;
    img {
      margin: 32px 0;
      @media (min-width: $tablet) {
        margin: 0 0 12px 270px;
      }
    }
  }

  &__arrows {
    img {
      position: absolute;
      @media (min-width: $tablet) and (max-width: #{$desktop - 0.1px}) {
        display: none;
      }

      &:first-child {
        left: -110px;
        top: 280px;
        transform: rotate(90deg);
        @media (min-width: $tablet) {
          transform: rotate(0);
          top: auto;
          left: 210px;
          bottom: 60px;
        }
      }

      &:last-child {
        right: -140px;
        bottom: 300px;
        transform: rotate(90deg);
        @media (min-width: $tablet) {
          transform: rotate(0);
          right: 210px;
          bottom: 110px;
        }
      }
    }
  }

  &__btn {
    margin-top: 32px;
    width: 100%;
    @media (min-width: $tablet) {
      margin-top: 60px;
      width: auto;
    }
  }

  &__decor {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    width: 500px;
    z-index: -1;
    @media (min-width: $tablet) {
      width: 100%;
    }
    img {
      position: absolute;
      &:nth-child(1) {
        display: none;
        @media (min-width: $tablet) {
          display: block;
          left: -80px;
          top: 150px;
        }
      }
      &:nth-child(2) {
        left: 40px;
        top: 70px;
        @media (min-width: $tablet) {
          left: 150px;
          top: 40px;
        }
      }
      &:nth-child(3) {
        right: 10px;
        top: 130px;
        @media (min-width: $tablet) {
          right: auto;
          left: 340px;
          top: 160px;
        }
      }
      &:nth-child(4) {
        left: 15px;
        top: 880px;
        @media (min-width: $tablet) {
          top: 540px;
        }
      }
      &:nth-child(5) {
        right: 0;
        top: 420px;
        @media (min-width: $tablet) {
          right: 320px;
          top: 450px;
        }
      }
      &:nth-child(6) {
        left: 40px;
        top: 660px;
        @media (min-width: $tablet) {
          left: auto;
          right: 340px;
          top: 100px;
        }
      }
      &:nth-child(7) {
        right: 0;
        top: 1180px;
        @media (min-width: $tablet) {
          right: 240px;
          top: 580px;
        }
      }
      &:nth-child(8) {
        right: 20px;
        top: 750px;
        @media (min-width: $tablet) {
          right: -50px;
          top: 150px;
        }
      }
      &:nth-child(9) {
        right: 20px;
        top: -80px;
        @media (min-width: $tablet) {
          right: 280px;
          top: -70px;
        }
      }
      &:nth-child(10) {
        left: 0;
        top: 1120px;
        transform: rotate(300deg);
        @media (min-width: $tablet) {
          left: 290px;
          top: 670px;
        }
      }
    }
  }

  &__stickers {
    display: flex;
    justify-content: center;
    text-align: left;
    color: #ffffff;
    padding: 0 16px;
    @media (min-width: $tablet) {
      bottom: -100px;
      padding: 0;
    }
    .card-animate {
      @media (hover: hover) {
        &:hover {
          .card-animate__main {
            transform: rotate(-1.3deg);
          }
          &::before {
            transform: rotate(2.3deg);
          }

          img {
            transform: rotate(6.3deg) scale(1.05);
          }
          // .steps__stickers-info {
          //   transform: rotate(1.3deg);
          // }
        }
      }
      &__main {
        display: flex;
        align-items: center;
        gap: 24px;
        background-color: $color-purple-medium;
        padding: 24px 12px;
        transform: rotate(-0.72deg);
        border: 2px solid #ffffff;
        @media (min-width: $tablet) {
          padding: 32px;
        }

        img {
          width: val(86, 138);
        }
      }
      &::before {
        width: 104%;
        left: -2%;
        transform: rotate(0.93deg);
        background-color: $color-purple-light;
      }
    }
  }

  &__stickers-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    transform: rotate(0.72deg);
    transition: transform 0.6s $ease;
  }
}

.prizes {
  position: relative;
  padding: 100px 0 90px 0;
  color: #ffffff;
  background-color: $color-purple-medium;
  text-align: center;

  @media (min-width: $tablet) {
    padding: 290px 0 180px 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    background: url("data:image/svg+xml;utf8,\
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 150' preserveAspectRatio='none'>\
      <path d='M0,0 C480,200 960,200 1440,0 L1440,150 L0,150 Z' fill='white'/></svg>")
      no-repeat;
    background-size: 100% 100%;
    transform: rotate(180deg);
    z-index: 2;
    @media (min-width: $tablet) {
      height: 290px;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 48px;
  }

  &__list {
    display: grid;
    gap: 48px;
    padding: 0 16px;
    @media (min-width: $tablet) {
      grid-template-columns: 1fr 1fr;
      padding: 0;
    }
    @media (min-width: $desktop) {
      gap: 135px;
    }
  }

  &__list-left {
    display: flex;
    flex-direction: column;
    gap: 32px;

    .card-animate {
      @media (hover: hover) {
        &:hover {
          .card-animate__main {
            transform: rotate(-1.3deg);
          }
          &::before {
            transform: rotate(2.3deg);
          }

          img {
            transform: rotate(6.3deg) scale(1.05);
          }
          h3 {
            transform: rotate(-3.3deg);
          }
        }
      }
      &__main {
        color: $color-black;
        aspect-ratio: 1/1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: rotate(2.2deg);
        @media (min-width: $tablet) {
          aspect-ratio: unset;
          height: 420px;
        }
        img {
          margin-bottom: 32px;
        }
        h3 {
          transform: rotate(-2.2deg);
        }
      }
      &::before {
        top: -2%;
        left: 3%;
        transform: rotate(0.36deg);
        background-color: #ffffff;
        opacity: 0.6;
      }
    }
  }

  &__list-right {
    display: flex;
    flex-direction: column;
    gap: 48px;
    @media (min-width: $tablet) {
      gap: 32px;
    }
    & > p {
      @media (min-width: $tablet) {
        margin-bottom: auto;
      }
    }
    .card-animate {
      &__main {
        height: 180px;
        display: flex;
        align-items: center;
        gap: 24px;
        background-color: $color-purple-light;
        padding: 24px 12px;

        @media (min-width: $tablet) {
          padding: 32px;
        }

        img {
          width: 115px;
        }
      }

      &:first-of-type {
        @media (hover: hover) {
          &:hover {
            .card-animate__main {
              transform: rotate(1.3deg);
            }
            &::before {
              transform: rotate(-2.3deg);
            }

            img {
              transform: rotate(-6.3deg) scale(1.05);
            }
          }
        }
        .card-animate__main {
          transform: rotate(-2.36deg);
        }
        &::before {
          top: -15px;
          left: 2%;
          transform: rotate(-1.1deg);
          background-color: #ffffff;
          opacity: 0.6;
        }
        h3 {
          transform: rotate(2.36deg);
        }
      }

      &:last-of-type {
        @media (hover: hover) {
          &:hover {
            .card-animate__main {
              transform: rotate(3.3deg);
            }
            &::before {
              transform: rotate(-2.3deg);
            }

            img {
              transform: rotate(-6.3deg) scale(1.05);
            }
            h3 {
              transform: rotate(0.3deg);
            }
          }
        }
        .card-animate__main {
          transform: rotate(1.73deg);
        }
        &::before {
          top: -4px;
          left: 1%;
          transform: rotate(0.6deg);
          background-color: #ffffff;
          opacity: 0.6;
        }
        h3 {
          transform: rotate(-1.73deg);
        }
        img {
          transform: rotate(-1.73deg);
        }
      }
    }
    h3 {
      text-align: left;
    }
  }
}

.faq {
  background: $color-black url('/images/home/pattern-faq.svg') repeat left top;
  color: #ffffff;
  padding: 100px 0;
  @media (min-width: $tablet) {
    padding: 180px 0;
  }
  &__title {
    text-align: center;
    margin-bottom: 32px;
  }

  &__list {
    width: 100%;
    p,
    ul,
    ol {
      font-family:
        'PTSans-Regular',
        -apple-system,
        BlinkMacSystemFont,
        Arial,
        sans-serif;
      letter-spacing: normal;
      text-transform: none;
      font-weight: 400;
      font-size: val(14, 16);
      line-height: 140%;
    }
    p {
      margin-bottom: 24px;
    }
    ol {
      list-style-type: decimal;
    }
    ul,
    ol {
      margin-bottom: 24px;
      padding-left: 32px;
      list-style-position: outside;
      li {
        padding-left: 12px;
        &:not(:last-of-type) {
          margin-bottom: 16px;
        }
      }
    }
    ul {
      li {
        list-style: disc;
      }
    }
  }
  &__item {
    border-top: 1px solid #ffffff;
    &:last-of-type {
      border-bottom: 1px solid #ffffff;
    }
  }
  &__item-flex {
    display: flex;
  }
  &__item-header[data-state='open'] {
    & .faq__iconify {
      transform: rotate(225deg);
    }
  }
  &__item-trigger {
    color: #ffffff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease 0s;
    background: none;
    border: none;
    padding: 4px 0;
    @media (hover: hover) {
      &:hover {
        color: $color-purple-light;
      }
    }
  }

  &__iconify {
    width: 42px;
    height: 42px;
    transition: all 0.2s ease 0s;
  }

  &__item-content {
    overflow: hidden;
    border-top: 1px solid #ffffff;
    &[data-state='closed'] {
      animation: accordion-up 200ms ease-out;
    }
    &[data-state='open'] {
      animation: accordion-down 200ms ease-out;
    }
    &[hidden]:where(:not([hidden='until-found'])) {
      display: none !important;
    }
  }
  &__item-inner {
    padding-top: 24px;
  }
}

@keyframes accordion-down {
  0% {
    height: 0;
  }

  100% {
    height: var(--reka-collapsible-content-height);
  }
}

@keyframes accordion-up {
  0% {
    height: var(--reka-collapsible-content-height);
  }

  100% {
    height: 0;
  }
}
</style>
