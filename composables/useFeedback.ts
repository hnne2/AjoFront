import { useModal, useVfm } from 'vue-final-modal'
import AppModal from '~/components/AppModal.vue'

interface FormData {
  name: string
  tel: string
  email: string
  agree: boolean
  prize: string
  lotteryId: string
}

const openSuccessModal = () => {
  const { open } = useModal({
    component: AppModal,
    attrs: {
      title: 'Спасибо!',
      description: 'Мы свяжемся с вами для получения приза.',
    },
  })

  const cookieLotteryStatus = useCookie<string | null>('lottery_status')
  cookieLotteryStatus.value = 'end'
  open()
}

let errorStatusCode: string | undefined

const openFailureModal = () => {
  const { open } = useModal({
    component: AppModal,
    attrs: {
      title: 'Что-то пошло не так...',
      description:
        'Мы знаем о проблеме и уже работаем. Попробуйте обновить страницу или зайти попозже.',
    },
    slots: {
      error: String(errorStatusCode),
    },
  })
  open()
}

export default function useFeedback() {
  const { closeAll } = useVfm()
  // const config = useRuntimeConfig()
  const isLoading = ref<boolean>(false)

  const form = reactive<FormData>({
    name: '',
    tel: '',
    email: '',
    agree: false,
    prize: '',
    lotteryId: '',
  })

  const handleSubmit = async (values: any, actions: any) => {
    isLoading.value = true
    errorStatusCode = undefined

    try {
      const { agree, ...payload } = form

      await $fetch('/api/feedback/', {
        // baseURL: config.public.baseURL,
        method: 'POST',
        body: payload,
      })

      actions.resetForm()
      await closeAll()
      openSuccessModal()
    } catch (error: any) {
      if (error.statusCode === 422) {
        actions.setErrors(error.data.errors)
        errorStatusCode = error.data.errors
      } else {
        errorStatusCode = error.statusCode
        openFailureModal()
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    form,
    isLoading,
    handleSubmit,
  }
}
