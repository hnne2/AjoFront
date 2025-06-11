<template>
  <nav class="nav">
    <div class="nav__item">
      <NuxtLink class="nav__link" to="/#steps">Как участвовать</NuxtLink>
    </div>
    <div class="nav__item">
      <NuxtLink class="nav__link" to="/#prizes">Призы</NuxtLink>
    </div>
    <div class="nav__item">
      <NuxtLink class="nav__link" to="/#faq">Вопрос-ответ</NuxtLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: column;
  gap: 32px;
  text-align: center;
  @media (min-width: $tablet) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  &__link {
    position: relative;
    transition: all 0.2s ease 0s;
    &::after {
      content: '';
      bottom: -4px;
      display: block;
      height: 2px;
      left: 50%;
      position: absolute;
      background: $color-black;
      transition:
        width 0.2s ease 0s,
        left 0.2s ease 0s;
      width: 0;
    }
    @media (hover: hover) {
      &:hover {
        &::after {
          width: 100%;
          left: 0;
        }
      }
    }
  }
}
</style>
