<script lang="ts" setup>
const props = defineProps<{ class?: string }>()

const isFilled = computed(() => {
  return !props.class?.includes('fill-')
})
</script>

<template>
  <div class="logo" :class="props.class">
    <NuxtIcon name="icon-logo" :filled="isFilled" />
  </div>
</template>

<style lang="scss" scoped>
.logo {
  :deep(.nuxt-icon svg) {
    width: 100%;
    height: auto;
    margin: 0;
  }
}
</style>
