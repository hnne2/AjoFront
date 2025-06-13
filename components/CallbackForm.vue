<script lang="ts" setup>
import { vMaska } from 'maska/vue'
import * as Yup from 'yup'

interface FormData {
  name: string
  tel: string
  email: string
  agree: boolean
  prize: string
  lotteryId: string
}

const isLoading = ref<boolean>(false)

const props = defineProps<{
  prize: string
  lotteryId: string
}>()

const emits = defineEmits<{
  (e: 'submit-success'): void
  (e: 'submit-failure', error: any): void
}>()

const form = reactive<FormData>({
  name: '',
  tel: '',
  email: '',
  agree: false,
  prize: props.prize,
  lotteryId: props.lotteryId,
})

const schema = Yup.object().shape({
  name: Yup.string().required(),
  tel: Yup.string().required().length(16, 'Укажите корректный телефон'),
  email: Yup.string().required().email(),
  agree: Yup.boolean().oneOf([true], 'Вы должны согласиться с условиями'),
  prize: Yup.string(),
  lotteryId: Yup.string(),
})

function onTelInput(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.value.startsWith('+7 8') || input.value.startsWith('+78')) {
    input.value = '+7 ' + input.value.slice(4)
    form.tel = input.value
  }
}
const baseUrl = window.location.origin

const handleSubmit = async (_values: any, actions: any) => {
  isLoading.value = true

  try {
    await $fetch(`${baseUrl}/ajo/feedback/`, {
      method: 'POST',
      body: { ...form },
    })

    actions.resetForm()
    emits('submit-success')
  } catch (error: any) {
    if (error.statusCode === 422) {
      actions.setErrors(error.data.errors)
    } else {
      emits('submit-failure', error)
    }
  } finally {
    isLoading.value = false
  }
}
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
              @input="onTelInput"
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
    <button :disabled="isLoading" class="btn btn--m btn--black" type="submit">
      Отправить
    </button>
  </Form>
</template>
