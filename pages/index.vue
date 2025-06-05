<script lang="ts" setup>
const { data, error } = await useFetch<any>('/api/home/')

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  })
}
</script>

<template>
  <h1 class="typo-h1">{{ data.seo.H1 }}</h1>
</template>

<style lang="scss" scoped></style>
