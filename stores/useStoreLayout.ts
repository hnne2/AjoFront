import { defineStore } from 'pinia'

interface State {
  _email: any | undefined
}

export const useStoreLayout = defineStore('layout', {
  state: (): State => ({
    _email: undefined,
  }),

  getters: {
    email: (state) => state._email,
  },

  actions: {
    async fetch() {
      try {
        const response = await $fetch<any>(`/api/layout/`, {
          headers: useRequestHeaders(['cookie']),
        })

        this._email = response.email
      } catch (error: any) {
        throw createError({
          statusCode: error.statusCode,
          statusMessage: 'Ошибка сервера',
        })
      }
    },
  },
})
