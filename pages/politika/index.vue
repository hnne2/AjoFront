<script lang="ts" setup>
const { data, error } = await useFetch<any>('/api/politika/')

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  })
}
</script>

<template>
  <div class="politika">
    <div class="container">
      <!-- <ul class="breadcrumbs typo-p1">
        <li class="breadcrumbs__item">
          <NuxtLink class="breadcrumbs__link" to="/">Главная</NuxtLink>
        </li>
        <li class="breadcrumbs__item">Политика конфиденциальности</li>
      </ul> -->
      <!-- <UBreadcrumb v-if="data.breadcrumbs" class="" :links="data.breadcrumbs" /> -->
      <div class="politika__wrap">
        <h1 class="politika__title typo-h3">Политика конфиденциальности</h1>
        <div class="politika__content" v-html="data.content" />
        <div class="politika__footer">
          <h3 class="typo-h6">Важно знать!</h3>
          <p class="typo-p1">
            Для придания юридической силы дисклаймеру, включенному в текст
            соглашения с пользователем, необходимо подтвердить факт ознакомления
            и принятия пользователем его условий. Для этого используется
            предусмотренный законодательством механизм заключения договоров.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.politika {
  &__wrap {
    padding: 48px 0 56px 0;
    @media (min-width: $tablet) {
      padding: 80px 0 120px 0;
    }
    h2 {
      margin-top: 24px;
      @media (min-width: $tablet) {
        margin-top: 48px;
      }
    }
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
      margin-top: 8px;
      @media (min-width: $tablet) {
        margin-top: 16px;
      }
    }
    ul,
    ol {
      padding-left: 48px;
      li {
        margin-top: 8px;
        &::marker {
          margin-right: 12px;
        }
      }
    }
    ul {
      li {
        list-style: disc;
      }
    }
  }

  &__footer {
    border-top: 1px solid $color-black;
    margin-top: 24px;
    padding-top: 24px;
    @media (min-width: $tablet) {
      margin-top: 48px;
      padding-top: 48px;
    }
  }
}
</style>
