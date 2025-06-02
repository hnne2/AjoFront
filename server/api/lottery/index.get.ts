import data from '~/mock-data/lottery/index.json'

export default defineEventHandler(async () => {
  try {
    const response = await new Promise((resolve, _reject) => {
      setTimeout(() => {
        // const won = Math.random() < 1
        resolve({ prize: data.prize })
        // resolve({ prize: won ? data.prize : null })
        // reject(new Error('Произошла ошибка'))
      }, 100)
    })

    return response
  } catch (error) {
    return error
  }
})
