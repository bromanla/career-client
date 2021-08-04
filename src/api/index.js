import axios from 'axios'
import config from '@/config.js'
import store from '@/store/index.js'
import router from '@/router/index.js'
import subcodes from './subcodes.js'

const api = axios.create({
  baseURL: config.api,
  timeout: 1000
})

// Перехватчик запроса
api.interceptors.request.use(async (urlConfig) => {
  if (store.getters['auth/isExp']) {
    try {
      await store.dispatch('auth/refresh')
    } catch (error) {
      router.push({
        name: 'login',
        params: {
          message: error.message
        }
      })
    }
  }

  // Добавляем jwt в заголовки
  const access = store.getters['auth/access']
  urlConfig.headers.Authorization = `Bearer ${access}`

  return urlConfig
})

// Перехватчик ответа
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let message = 'Неизвестная ошибка'

    if (error.response) {
      switch (error.response.status) {
        case 400:
          const subcode = error.response.data.subcode

          if (subcodes.hasOwnProperty(subcode))
            message = subcodes[subcode]
          break
        case 401:
          message = 'Не удалось авторизоваться'
          break
        case 403:
          message = 'Недостаточно прав'
          break
        case 422:
          message = 'Не удалось разобрать данные'
          break
        case 429:
          message = 'Слишком много запросов к серверу'
          break
        case 429:
          message = 'Ошибка сервера'
          break
        default:
          console.log(error.response)
          break
      }
    }

    throw { message }
  }
)

export default api
