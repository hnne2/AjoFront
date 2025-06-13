import {useModal} from 'vue-final-modal'
import AppModal from '~/components/AppModal.vue'

const openSuccessModal = () => {
  const { open } = useModal({
    component: AppModal,
    attrs: {
      title: 'Спасибо!',
      description: 'Мы свяжемся с вами для вручения приза.',
    },
  })
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
  return {
    openSuccessModal,
    openFailureModal,
  }
}
