import data from '~/mock-data/layout/index.json'

export default defineEventHandler(async () => {
  try {
    const response = await new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve(data)
        // reject(new Error('Произошла ошибка'))
      }, 100)
    })

    return response
  } catch (error) {
    return error
  }
})
