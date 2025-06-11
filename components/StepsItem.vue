<script lang="ts" setup>
import type { Step } from '~/types/Step'
defineProps<{
  step: Step
}>()
</script>

<template>
  <div class="steps-item">
    <img :src="step.image.url" :alt="step.image.alt" />
    <div class="steps-item__number typo-h3">{{ step.number }}</div>
    <h3 class="steps-item__label typo-h4">{{ step.label }}</h3>
    <p class="steps-item__description typo-p1">{{ step.description }}</p>
  </div>
</template>

<style lang="scss" scoped>
.steps-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  img {
    width: 100%;
    max-width: 210px;
    aspect-ratio: 1/1;
    margin-bottom: -50px;
    transition: transform 0.6s $ease;
    @media (min-width: $tablet) {
      max-width: 300px;
    }
  }

  &:nth-child(1) img {
    @media (hover: hover) {
      &:hover {
        transform: rotate(6.3deg) scale(1.05);
      }
    }
  }

  &:nth-child(2) img {
    @media (hover: hover) {
      &:hover {
        transform: rotate(5.3deg) scale(1.05);
      }
    }
  }

  &:nth-child(3) img {
    @media (hover: hover) {
      &:hover {
        transform: rotate(-6.3deg) scale(1.05);
      }
    }
  }

  &__number {
    width: val(48, 64);
    height: val(48, 64);
    border-radius: 100px;
    color: #ffffff;
    background-color: $color-purple-medium;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  &__label {
    color: $color-black;
  }
}
</style>
