<template>
  <div class="card-animate">
    <div class="card-animate__main">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.card-animate {
  position: relative;

  @media (hover: hover) {
    &:hover {
      img {
        transform: rotate(5deg) scale(1.05);
      }
    }
  }

  &::before {
    content: '';
    position: absolute;
    border-radius: 16px;
    background-color: #000;
    width: 100%;
    height: 100%;
    transition: transform 0.6s $ease;
  }

  &__main {
    position: relative;
    border-radius: 16px;
    background-color: #fff;
    overflow: hidden;
    transition: transform 0.6s $ease;
  }

  img,
  h3 {
    transition: transform 0.6s $ease;
  }
}
</style>
