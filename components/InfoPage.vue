<script lang="ts" setup>
defineProps<{
  data: any
}>()
</script>

<template>
  <div class="info-page">
    <div class="container">
      <div class="info-page__wrap">
        <div class="info-page__content user-content" v-html="data.content" />
        <div class="info-page__footer">
          <h3 class="typo-h6">Важно знать!</h3>
          <p class="typo-p1">
            Для придания юридической силы дисклаймеру, включенному в текст
            соглашения с пользователем, необходимо подтвердить факт ознакомления
            и принятия пользователем его условий. Для этого используется
            предусмотренный законодательством механизм заключения договоров.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-page {
  &__wrap {
    padding: 48px 0 56px 0;
    @media (min-width: $tablet) {
      padding: 80px 0 120px 0;
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
    p {
      margin-top: 8px;
      @media (min-width: $tablet) {
        margin-top: 16px;
      }
    }
  }
}
</style>
