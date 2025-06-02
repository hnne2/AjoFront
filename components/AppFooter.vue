<script lang="ts" setup></script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <AppLogo class="footer__logo fill-white" />
        <div class="footer__contact">
          <p class="typo-p1">По вопросам акции:</p>
          <a href="mailto:client@limkorm.ru">client@limkorm.ru</a>
        </div>
      </div>
      <div class="footer__bottom typo-p2">
        <p>© 2025 Все права защищены «AJO»</p>
        <div class="footer__bottom-list">
          <div class="footer__bottom-list-item">
            <NuxtLink to="/" target="_blank">Правила акции</NuxtLink>
          </div>
          <div class="footer__bottom-list-item">
            <NuxtLink to="/" target="_blank"
              >Пользовательское соглашение</NuxtLink
            >
          </div>
          <div class="footer__bottom-list-item">
            <NuxtLink to="/" target="_blank"
              >Политика конфиденциальности</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: $color-black;
  padding: 24px 0;
  color: #ffffff;
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  &__logo {
    display: none;
    @media (min-width: $tablet) {
      display: block;
    }
  }

  &__contact {
    @media (min-width: $tablet) {
      text-align: right;
    }
    p {
      margin-bottom: 16px;
      @media (min-width: $tablet) {
        margin-bottom: 12px;
      }
    }
    a {
      font-size: val(20, 24);
      position: relative;
      &::after {
        content: '';
        bottom: -4px;
        display: block;
        height: 2px;
        left: 50%;
        position: absolute;
        background: #ffffff;
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

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media (min-width: $tablet) {
      flex-direction: row;
    }
  }

  &__bottom-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media (min-width: $tablet) {
      flex-direction: row;
    }
  }

  &__bottom-list-item {
    a {
      position: relative;
      transition: all 0.2s ease 0s;
      &::after {
        content: '';
        bottom: -2px;
        display: block;
        height: 1px;
        left: 0;
        position: absolute;
        background: #ffffff;
        transition:
          width 0.2s ease 0s,
          left 0.2s ease 0s;
        width: 100%;
      }
      @media (hover: hover) {
        &:hover {
          &::after {
            width: 0;
            left: 50%;
          }
        }
      }
    }
  }
}

.fill-white {
  color: #ffffff;
}
</style>
