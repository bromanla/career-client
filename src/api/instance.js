import axios from 'axios'
import config from '@/config.js'
import store from '@/store/index.js'
import router from '@/router/index.js'
import jwt from 'jsonwebtoken'

const api = axios.create({
  baseURL: config.api,
  timeout: 1000
})

// Перехватчик запроса
api.interceptors.request.use(async (urlConfig) => {
  const { refresh, expiredAt } = store.getters.axios

  // Проверям токен на свежесть
  if (expiredAt) {
    if (Number(expiredAt) <= ~~(Date.now()/1000)) {
      console.log('Update token')

      try {
        const { data } = await axios.post(`${config.api}/auth/refresh`, { refresh })
        const { exp } = jwt.decode(data.access);

        store.commit('setTokens', { ...data, exp })
        store.dispatch('setLocalStorage', { ...data, exp })
      } catch {
        // Жесткий сброс
        console.error('Hard reset')

        localStorage.clear()
        store.commit('setTokens', { access: '', refresh: '', exp: '' })
        router.push({
          name: 'login',
          params: {
            message: 'Ошибка авторизации'
          }
        })
      }
    }
  }

  // Добавляем jwt в заголовки
  const { access } = store.getters.axios
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
    // return Promise.reject({ message })
  }
)

export default api
