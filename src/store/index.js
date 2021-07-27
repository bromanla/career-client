import { createStore } from 'vuex'

import { auth } from '@/api'

export default createStore({
  state: {
    access: '',
    refresh: '',
    role: '',
    expiredAt: ''
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async fetchLogin(context, { login, password }) {
      try {
        const data = await auth.login({ login, password })

        console.log(data)
      } catch (e) {

      }
    }
  },
  modules: {}
})
