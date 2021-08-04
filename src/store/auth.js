import jwt from 'jsonwebtoken'
import api from '@/api/index.js'
import axios from 'axios'
import config from '@/config.js'

export default {
  namespaced: true,
  state: () => ({
    login: localStorage.getItem('login'),
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    exp: localStorage.getItem('exp'),
  }),
  getters: {
    isAuth(state) {
      return Boolean(state.login && state.access && state.refresh && state.exp)
    },
    isExp(state) {
      return state?.exp ? Number(state.exp) <= Math.floor(Date.now() / 1000) : false
    },
    access(state) {
      return state.access
    },
    refresh(state) {
      return state.refresh
    },
    login(state) {
      return state.login
    }
  },
  mutations: {
    setLogin (state, { login }) {
      state.login = login

      localStorage.setItem('login', login)
    },
    setTokens (state, { access, refresh, exp }) {
      state.access = access
      state.refresh = refresh
      state.exp = exp

      localStorage.setItem('access', access)
      localStorage.setItem('refresh', refresh)
      localStorage.setItem('exp', exp)
    },
  },
  actions: {
    async fetchLogin({ commit }, { login, password }) {
      try {
        // Авторизация
        const { access, refresh } = await api.post('/auth/login', { login, password })

        // Разбираем jwt
        const { exp, role } = jwt.decode(access);

        // Проверка доступа
        if (role === 'student') {
          await api.post('/auth/logout', { refresh })
          throw { message: 'Сервис только для администраторов'}
        }

        commit('setLogin', { login })
        commit('setTokens', { access, refresh, exp })
      } catch (error) {
        // Проксируем ошибку запроса клиенту
        throw error
      }
    },
    async logout({ state, commit }) {
      console.log('Logout')
      const { refresh } = state

      commit('setLogin', { login: null })
      commit('setTokens', { access: null, refresh: null, exp: null })

      localStorage.clear()

      if (refresh) {
        await axios.post(`${config.api}/auth/logout`, { refresh })
      }
    },
    async refresh({ state, commit, dispatch }) {
      try {
        if (state.refresh) {
          console.log('Update token')

          const { data } = await axios.post(`${config.api}/auth/refresh`, { refresh: state.refresh })
          const { exp } = jwt.decode(data.access);

          commit('setTokens', {...data, exp})
        }
      } catch (e) {
        console.error('Hard reset')

        dispatch('logout')
        throw { message: 'Ошибка авторизации'}
      }
    }
  }
}
