<script lang="ts" setup>
const isOpenMenu = ref<boolean>(false)

const toggleMenu = () => {
  isOpenMenu.value = !isOpenMenu.value
}

const handleMenuBody = (event: Event) => {
  const target = event.target as HTMLElement
  if (target.closest('a') && isOpenMenu.value) {
    toggleMenu()
  }
}
</script>

<template>
  <header class="header" @click="handleMenuBody">
    <div class="container">
      <NuxtLink class="header__logo-mobile" to="/">
        <AppLogo />
      </NuxtLink>
      <div class="header__wrap" :class="{ active: isOpenMenu }">
        <div class="header__inner">
          <NuxtLink class="header__logo-desktop" to="/">
            <AppLogo />
          </NuxtLink>
          <AppNav />
          <NuxtLink class="btn btn--s btn--black-outline" to="/upload/">
            Загрузить чек
          </NuxtLink>
        </div>
      </div>
      <div class="header__burger">
        <AppBurger :open-menu="isOpenMenu" @click="toggleMenu" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  height: 64px;
  color: $color-black;
  @media (min-width: $tablet) {
    height: 80px;
  }

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    @media (min-width: $tablet) {
      display: block;
    }
  }
  &__wrap {
    @media (max-width: #{$tablet - 0.1px}) {
      position: fixed;
      left: 0;
      top: 0;
      height: 100svh;
      width: 100%;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.3s ease,
        visibility 0.3s ease;
      padding-top: 64px;
      background-color: #fff;
    }
    &.active {
      opacity: 1;
      visibility: visible;
      z-index: 5;
      transition:
        opacity 0.3s ease,
        visibility 0.3s ease;
    }
    @media (min-width: $tablet) {
      height: 100%;
    }
  }
  &__inner {
    display: flex;
    height: 100%;
    @media (max-width: #{$tablet - 0.1px}) {
      padding: 48px 16px;
      flex-direction: column;
      gap: 80px;
      overflow-y: auto;
    }
    @media (min-width: $tablet) {
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }
  }
  &__logo-mobile {
    flex-shrink: 0;
    width: val(96, 128);
    z-index: 6;
    @media (min-width: $tablet) {
      display: none;
    }
  }
  &__logo-desktop {
    display: none;
    flex-shrink: 0;
    width: val(96, 128);
    @media (min-width: $tablet) {
      display: block;
    }
  }
  &__burger {
    z-index: 6;
    display: flex;
    align-items: center;
    @media (min-width: $tablet) {
      display: none;
    }
  }
}
</style>
