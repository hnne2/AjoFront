<script lang="ts" setup>
const baseUrl = window.location.origin

const { data, error } = await useFetch<any>(`${baseUrl}/ajo/rules`)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  })
}

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
  <InfoPage :data="data" />
</template>
