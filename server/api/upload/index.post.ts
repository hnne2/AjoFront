export default defineEventHandler(async (_event) => {
  try {
    await new Promise((resolve, _reject) =>
      setTimeout(() => {
        resolve('Файл успешно загружен')
        // reject(new Error('Ошибка при загрузке файла'))
      }, 1000)
    )

    // const files = await readMultipartFormData(event)
    // console.log(files)
    return 'Успешно'
  } catch (error) {
    return {
      statusCode: 500,
      statusMessage: 'Ошибка при загрузке файла',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка',
    }
  }
})
