import { createStore } from 'vuex'
import jwt from 'jsonwebtoken'
import api from '@/api/instance.js'

export default createStore({
  state: {
    access: localStorage.getItem('access') || '',
    refresh: localStorage.getItem('refresh') || '',
    role: localStorage.getItem('role') || '',
    expiredAt: localStorage.getItem('expiredAt') || ''
  },
  getters: {
  },
  mutations: {
    setTokens (state, { access, refresh, exp, role}) {
      state.access = access
      state.refresh = refresh
      state.role = role
      state.expiredAt = exp
    },
  },
  actions: {
    async setLocalStorage (ctx , { access, refresh, exp, role }) {
      localStorage.setItem('access', access)
      localStorage.setItem('refresh', refresh)
      localStorage.setItem('role', role)
      localStorage.setItem('expiredAt', exp)
    },
    async fetchLogin({ commit, dispatch }, { login, password }) {
      try {
        // Авторизуемся через сервер
        const { access, refresh } = await api.post('/auth/login', { login, password })

        // Разбираем jwt
        const { exp, role } = await jwt.decode(access);

        // Выходим на сервере и посылаем ошибку валидации клиенту
        if (role === 'student') {
          await api.post('/auth/logout', { refresh })
          throw { message: 'Сервис только для администраторов'}
        }

        // Устанавливаем locastorage и state
        dispatch('setLocalStorage', { access, refresh, exp, role })
        commit('setTokens', { access, refresh, exp, role })
      } catch (error) {
        // Проксируем ошибку запроса клиенту
        throw error
      }
    }
  },
  modules: {}
})
