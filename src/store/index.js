import { createStore } from 'vuex'
import axios from 'axios'

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
        console.log(login)
        const data = await axios.post('http://localhost:8080/auth/login', { login, password })

        console.log(data)
      } catch {

      }
    }
  },
  modules: {
  }
})
