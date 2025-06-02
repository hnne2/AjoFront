<template>
  <div class="close-custom">
    <span></span>
    <span></span>
  </div>
</template>

<style lang="scss" scoped>
.close-custom {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  @media (min-width: $tablet) {
    width: 32px;
    height: 32px;
  }

  @media (hover: hover) {
    &:hover {
      span {
        transition: transform calc(1s / 2) cubic-bezier(0.58, 0.01, 0.03, 0.99);
        &:first-child {
          transform: rotate(135deg) !important;
          transition-delay: 0.1s;
        }
        &:last-child {
          transform: rotate(45deg) !important;
        }
      }
    }
  }

  span {
    will-change: transform;
    position: absolute;
    width: 32px;
    height: 2px;
    background-color: $color-black;
    transition: transform 1s cubic-bezier(0.58, 0.01, 0.03, 0.99);
    transition-duration: 0s;

    @media (min-width: $tablet) {
      width: 42px;
      height: 3px;
    }

    &:first-child {
      transform: rotate(45deg);
    }
    &:last-child {
      transform: rotate(-45deg);
    }
  }
}
</style>
