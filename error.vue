<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-purple',
  },
})

const error = useError()

const handleError = () => {
  clearError({
    redirect: '/',
  })
}
</script>

<template>
  <NuxtLayout>
    <div v-if="error" class="error-page">
      <div class="container">
        <div v-if="error.statusCode === 404" class="error-page__body">
          <h1 class="error-page__404">
            <img src="/images/404.svg" alt="404" />
          </h1>
          <p v-if="error.message" class="error-page__msg">
            Страница не найдена. Попробуйте перейти на главную страницу.
          </p>
          <button class="btn btn--m btn--white-outline" @click="handleError">
            На главную
          </button>
        </div>
        <div v-else class="error-page__body">
          <h1 class="error-page__title">{{ error.statusCode }}</h1>
          <p v-if="error.message" class="error-page__msg">
            {{ error.message }}
          </p>
          <button class="btn btn--m btn--white-outline" @click="handleError">
            На главную
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins.scss' as *;

.error-page {
  padding: 80px 0;
  flex: 1;
  display: flex;
  flex-direction: column;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: val(24, 32);
    text-align: center;
    max-width: 630px;
  }

  &__title {
    font-size: val(100, 250);
    line-height: 100%;
    margin-bottom: 24px;
  }

  &__404 {
    font-size: val(100, 250);
    line-height: 100%;
    width: val(280, 576);
    margin-bottom: 24px;
    img {
      width: 100%;
      vertical-align: middle;
    }
  }

  &__msg {
    font-size: val(20, 24);
  }

  button {
    width: 100%;
    @media (min-width: $tablet) {
      width: auto;
    }
  }
}
</style>
