<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: 'bg-blue',
  },
})
const baseUrl = window.location.origin
const headers = useRequestHeaders(['cookie'])
const cookieId = useCookie<string | null>('chek_id')
const chekId = ref<string | null>(null)

const { data, error, refresh } = await useFetch<any>(`${baseUrl}/ajo/upload`, {
  headers,
  query: cookieId.value ? { chek_id: cookieId.value } : {},
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  })
}


const inputRef = ref<HTMLInputElement>()
const onDropZone = ref<HTMLDivElement>()
const formData = new FormData()
const errorMessage = ref<string | null>(null)
const isLoading = ref<boolean>(false)
const isUpload = ref<boolean>(false)
const { files, isOverDropZone } = useDropZone(onDropZone, { onDrop })

const triggerFileSelect = () => {
  inputRef.value?.click()
}

const checkStatus = async () => {
  if (import.meta.server) return

  const pollInterval = setInterval(async () => {
    try {
      const result = await $fetch(`${baseUrl}/ajo/upload`, {
        method: 'GET',
        query: { chek_id: cookieId.value! },
      })

      if (result.status !== 'ready' && result.status !== 'check') {
        clearInterval(pollInterval)
        isLoading.value = false
      }

      data.value = result // если хочешь сохранить в `data`
    } catch {
      clearInterval(pollInterval)
      isLoading.value = false
      errorMessage.value = 'Ошибка при проверке статуса'
    }
  }, 5000)
}


if (data.value?.status == 'check') {
  checkStatus()
}

async function handleFile(file: File) {
  if (!file) {
    return (errorMessage.value = 'Файл не выбран')
  }
  if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
    return (errorMessage.value = 'Формат файла должен быть .jpg или .png')
  }
  if (file.size > 5 * 1024 * 1024) {
    return (errorMessage.value = 'Размер файла не должен превышать 5 МБ')
  }

  errorMessage.value = null
  isLoading.value = true

  formData.delete('chek_id')
  formData.delete('file')
  cookieId.value = null

  chekId.value = Date.now().toString()
  document.cookie = `chek_id=${chekId.value}; path=/; max-age=31536000`

  formData.append('chek_id', chekId.value)
  formData.append('file', file, file.name.replaceAll(' ', '-').toLowerCase())

  try {
    await $fetch(`${baseUrl}/ajo/upload`, {
      method: 'POST',
      body: formData,
    })
    isUpload.value = true
    cookieId.value = chekId.value
    await nextTick()
    checkStatus()
  } catch {
    return (errorMessage.value = 'Что то пошло не так, попробуйте еще раз')
  }
}

function onDrop() {
  if (isLoading.value) return

  const file = files.value?.[0]
  if (files.value?.length !== 1 || !file) {
    return (errorMessage.value = 'Загружайте по одному файлу!')
  }

  handleFile(file)
}

function onFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    return (errorMessage.value = 'Файл не выбран')
  }

  handleFile(file)
  target.value = ''
}

const toLottery = () => {
  cookieId.value = null
  navigateTo(`/lottery/${data.value.lottery_id}/`)
}

const onRestart = () => {
  cookieId.value = null
  refresh()
}
</script>

<template>
  <div class="upload">
    <div class="container">
      <h1 class="upload__title typo-h1">{{ data.seo.H1 }}</h1>
      <div
        class="upload__frame"
        :class="{
          'is-hover': isOverDropZone && !isLoading && data.status == 'ready',
        }"
      >
        <div
          v-if="data.status == 'ready' || data.status == 'check'"
          ref="onDropZone"
          class="upload__zone"
          :class="{ 'is-loading': isLoading }"
        >
          <div
            v-if="!isLoading && data.status !== 'check'"
            class="upload__zone-wrap"
          >
            <button
              class="upload__button btn btn--m btn--white-outline"
              @click="triggerFileSelect"
            >
              Выберите изображение...
            </button>
            <input
              ref="inputRef"
              type="file"
              accept="image/jpeg,image/png"
              class="visually-hidden"
              @change="onFileSelect"
            />
            <p class="upload__zone-drop-title typo-h5">
              или Перетащите изображение сюда
            </p>
            <p class="upload__zone-description typo-p1">
              Загрузите изображение формата .jpg или .png размером не более 5 Мб
            </p>
          </div>
          <div v-else class="upload__loading">
            <AppLoader />
            <p class="upload__loading-text typo-h4">
              <span v-if="!isUpload && data.status !== 'check'"
                >Чек загружается...</span
              >
              <span v-else>Чек загружен. Проверяем...</span>
            </p>
          </div>
        </div>

        <div
          v-if="data.status !== 'ready' && data.status !== 'check'"
          class="upload__result"
        >
          <div class="upload__result-icon">
            <img
              v-if="data.status == 'moderation'"
              src="/images/upload/warning.svg"
              alt=""
            />
            <img
              v-if="data.status == 'error'"
              src="/images/upload/error.svg"
              alt=""
            />
            <img
              v-if="data.status == 'success'"
              src="/images/upload/success.svg"
              alt=""
            />
          </div>
          <div class="upload__result-image">
            <img
              v-if="data.status == 'error'"
              src="/images/upload/dog.svg"
              alt=""
            />
            <img v-else src="/images/upload/cat.svg" alt="" />
          </div>
          <p class="upload__result-title typo-h5">
            <span v-if="data.status == 'moderation'">
              Мы не смогли распознать чек. Дождитесь модерации и заходите позже.
            </span>
            <span v-if="data.status == 'success'">
              Ваш чек прошел модерацию!
            </span>
            <span v-if="data.status == 'error'">
              Извините, Ваш чек не прошел проверку.
            </span>
          </p>
          <button
            v-if="data.status == 'error'"
            class="upload__result-btn btn btn--m btn--white-outline"
            @click="onRestart"
          >
            Попробовать снова
          </button>
          <button
            v-if="data.status == 'success'"
            class="upload__result-btn btn btn--m btn--white-outline"
            @click="toLottery"
          >
            Перейти к розыгрышу
          </button>
        </div>
      </div>
      <ErrorMessage
        v-if="errorMessage"
        :text="errorMessage"
        class="upload__error-msg"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload {
  padding: 50px 0 80px 0;
  text-align: center;
  @media (min-width: $tablet) {
    padding: 70px 0 120px 0;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    margin-bottom: 40px;
    @media (min-width: $tablet) {
      margin-bottom: 60px;
    }
  }

  &__frame {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 340px;
    background-image: url('/images/upload/pattern-bone.svg');
    background-repeat: repeat;
    background-position: top left;
    background-color: rgba(255, 255, 255, 0.2);
    border: 4px dashed #ffffff;
    border-radius: 16px;
    &.is-hover {
      border: 4px dashed $color-yellow;
      .upload__zone-wrap {
        opacity: 0.5;
      }
    }
  }

  &__zone {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 16px;
    transition: all 0.2s ease 0s;
    &.is-loading {
      cursor: not-allowed;
    }
  }

  &__zone-wrap {
    transition: all 0.2s ease 0s;
  }

  &__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 36px;
  }

  &__loading-text {
    animation: pulse 2s infinite;
  }

  &__zone-drop-title {
    display: none;
    @media screen and (min-width: $tablet) {
      display: block;
      margin-top: 36px;
    }
  }

  &__zone-description {
    margin-top: 8px;
  }

  &__error-msg {
    margin-top: 16px;
  }

  &__result {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }

  &__result-icon {
    position: absolute;
    left: 50%;
    top: -32px;
    transform: translateX(-50%);
  }

  &__result-image {
    width: 106px;
    height: 106px;
    margin-bottom: 24px;
  }

  &__result-btn {
    margin-top: 16px;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.2;
  }

  70% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>
