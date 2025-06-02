<script setup lang="ts">
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
        <div class="error-page__body">
          <h1 class="error-page__title">{{ error.statusCode }}</h1>
          <p v-if="error.statusMessage" class="error-page__status">
            {{ error.statusMessage }}
          </p>
          <p v-if="error.message" class="error-page__msg">
            {{ error.message }}
          </p>
          <button class="btn" @click="handleError">Главная страница</button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.error-page {
  padding: 80px 0;
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
  }

  &__title {
    font-size: 64px;
    font-weight: bold;
  }

  &__status {
    font-size: 18px;
  }

  &__msg {
    font-size: 16px;
  }
}
</style>
