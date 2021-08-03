import axios from 'axios'
import config from '@/config.js'
import store from '@/store/index.js'
import router from '@/router/index.js'

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
    let message

    // Есть тело ответа
    if (error.response) {
      // Ошибка с subcode
      if (error.response.status = 400) {
        switch (error.response.data.subcode) {
          case 10:
            // JSON parse error
            message = 'Ошибка при отправке данных'
            break;
          case 20:
            // Wrong login or password
            message = 'Неверный логин или пароль'
            break;
          case 21:
            // Refresh token not found
            message = 'Перезайдите в систему'
            break;
          case 30:

            break;
          case 31:

            break;
          case 32:

            break;
          case 33:

            break;
          case 34:

            break;
          case 40:

            break;
          case 41:

            break;
          case 42:

            break;
          case 43:

            break;
          case 44:

          default:
            break;
        }
      }
    }

    throw { message }
  }
)

export default api
