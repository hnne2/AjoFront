<script lang="ts" setup>
const isOpen = ref<boolean>(false)

const toggleState = () => {
  isOpen.value = !isOpen.value
}

watch(isOpen, (newVal) => {
  const htmlEl = document.documentElement
  if (newVal) {
    htmlEl.classList.add('lock')
  } else {
    htmlEl.classList.remove('lock')
  }
})
</script>

<template>
  <button
    class="burger"
    :class="{ active: isOpen }"
    type="button"
    @click="toggleState"
  >
    <span class="burger__inner">
      <span></span>
      <span></span>
    </span>
  </button>
</template>

<style lang="scss" scoped>
$cubic: cubic-bezier(0.4, 0.01, 0.165, 0.99);

.burger {
  position: relative;
  display: inline-block;
  height: 32px;
  width: 32px;
  cursor: pointer;
  transform: rotate(0deg);
  transition: all 0.3s $cubic;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background: transparent;

  &__inner {
    width: 32px;
    height: 12px;
    position: relative;
    display: block;
  span {
    width: 100%;
    height: 2px;
    display: block;
    position: relative;
    background: $color-black;
    transition: all 0.3s $cubic;
    transition-delay: 0s;
    &:first-child {
      transform: translateY(0px) rotate(0deg);
    }
    &:last-child {
      transform: translateY(8px) rotate(0deg);
    }
  }
  }


  &.active {
    transform: rotate(90deg);
    .burger__inner span {
      transition: all 0.4s $cubic;
      transition-delay: 0.2s;
      &:first-child {
        transform: translateY(5px) rotate(45deg);
      }
      &:last-child {
        transform: translateY(3px) rotate(-45deg);
      }
    }
  }
}
</style>
