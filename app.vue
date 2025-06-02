<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <ModalsContainer />
  </ClientOnly>
</template>
