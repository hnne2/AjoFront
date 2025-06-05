<script lang="ts" setup>
import { vMaska } from 'maska/vue'
import * as Yup from 'yup'

const props = defineProps<{
  prize: string
  lotteryId: string
}>()

const { isLoading, form, handleSubmit } = useFeedback()

form.prize = props.prize
form.lotteryId = props.lotteryId

const schema = Yup.object().shape({
  name: Yup.string().required(),
  tel: Yup.string().required().length(16, 'Укажите корректный телефон'),
  email: Yup.string().required().email(),
  agree: Yup.boolean().oneOf([true], 'Вы должны согласиться с условиями'),
  prize: Yup.string(),
  lotteryId: Yup.string(),
})
</script>

<template>
  <Form class="form" :validation-schema="schema" @submit="handleSubmit">
    <div class="form__flex">
      <Field
        v-slot="{ field, meta, errorMessage }"
        v-model="form.name"
        name="name"
      >
        <div class="input" :class="{ disabled: isLoading }">
          <input
            v-model.trim="form.name"
            v-maska
            data-maska="A"
            data-maska-tokens="A:[A-Za-zА-Яа-яЁё -]:multiple"
            v-bind="field"
            type="text"
            name="name"
            autocomplete="name"
            placeholder="Ваше имя*"
            :class="{
              error: meta.validated && !meta.valid,
            }"
            :disabled="isLoading"
          />

          <FormMessage v-if="errorMessage">
            {{ errorMessage }}
          </FormMessage>
        </div>
      </Field>
      <Field
        v-slot="{ field, meta, errorMessage }"
        v-model="form.tel"
        name="tel"
      >
        <div class="input" :class="{ disabled: isLoading }">
          <input
            v-maska="'+7 ### ###-##-##'"
            v-bind="field"
            type="tel"
            name="tel"
            autocomplete="tel"
            placeholder="Телефон*"
            :class="{
              error: meta.validated && !meta.valid,
            }"
            :disabled="isLoading"
          />

          <FormMessage v-if="errorMessage">
            {{ errorMessage }}
          </FormMessage>
        </div>
      </Field>
      <Field
        v-slot="{ field, meta, errorMessage }"
        v-model="form.email"
        name="email"
      >
        <div class="input" :class="{ disabled: isLoading }">
          <input
            v-bind="field"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="E-mail*"
            :class="{
              error: meta.validated && !meta.valid,
            }"
            :disabled="isLoading"
          />
          <FormMessage v-if="errorMessage">
            {{ errorMessage }}
          </FormMessage>
        </div>
      </Field>
      <Field
        v-slot="{ field, meta, errorMessage }"
        v-model="form.agree"
        name="agree"
        type="checkbox"
        :value="true"
        :unchecked-value="false"
      >
        <div class="input" :class="{ disabled: isLoading }">
          <label class="checkbox">
            <input
              v-bind="field"
              type="checkbox"
              :value="true"
              name="agree"
              class="checkbox__input"
              :class="{
                error: meta.validated && !meta.valid,
              }"
              :disabled="isLoading"
            />
            <span class="checkbox__custom"></span>
            <span class="checkbox__text">
              Я соглашаюсь с
              <NuxtLink to="/politika/" target="_blank"
                >Политикой Конфиденциальности</NuxtLink
              >
              сайта
            </span>
          </label>

          <FormMessage v-if="errorMessage">
            {{ errorMessage }}
          </FormMessage>
        </div>
      </Field>
    </div>
    <button :disabled="isLoading" class="btn btn--m btn--pink" type="submit">
      Отправить
    </button>
  </Form>
</template>
