import { createStore } from 'vuex'
import jwt from 'jsonwebtoken'
import api from '@/api/instance.js'

export default createStore({
  state: {
    access: localStorage.getItem('access') || '',
    refresh: localStorage.getItem('refresh') || '',
    expiredAt: localStorage.getItem('expiredAt') || ''
  },
  getters: {
    axios (state) {
      return {
        access: state.access,
        refresh: state.refresh,
        expiredAt: state.expiredAt
      }
    }
  },
  mutations: {
    setTokens (state, { access, refresh, exp }) {
      state.access = access
      state.refresh = refresh
      state.expiredAt = exp
    },
  },
  actions: {
    async setLocalStorage (ctx , { access, refresh, exp }) {
      localStorage.setItem('access', access)
      localStorage.setItem('refresh', refresh)
      localStorage.setItem('expiredAt', exp)
    },
    async fetchLogin({ commit, dispatch }, { login, password }) {
      try {
        // Авторизуемся через сервер
        const { access, refresh } = await api.post('/auth/login', { login, password })

        // Разбираем jwt
        const { exp, role } = jwt.decode(access);

        // Выходим на сервере и посылаем ошибку валидации клиенту
        if (role === 'student') {
          await api.post('/auth/logout', { refresh })
          throw { message: 'Сервис только для администраторов'}
        }

        // Устанавливаем locastorage и state
        dispatch('setLocalStorage', { access, refresh, exp })
        commit('setTokens', { access, refresh, exp })
      } catch (error) {
        // Проксируем ошибку запроса клиенту
        throw error
      }
    },
    async logout({ commit, state }) {
      // Чистим localStorage
      localStorage.clear()
      // Выходим на сервере
      await api.post('/auth/logout', { refresh: state.refresh })
      // Чистим vuex
      commit('setTokens', { access: '', refresh: '', exp: '' })
    },
    async fetchUsers() {
      const data = await api.get('/users')

      return data
    },
    async fetchClassrooms() {
      const data = await api.get('/classrooms')

      return data
    },
    async fetchSchools() {
      const data = await api.get('/schools')

      return data
    },
    async fetchExercises() {
      const data = await api.get('/exercises')

      return data
    }
  },
  modules: {}
})
