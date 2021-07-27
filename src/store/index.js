import { createStore } from 'vuex'
import axios from 'axios'
import config from '@/config.js'

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
        // const data = await axios.post('')
        // const data = await axios.post('http://bromanla.local/api/auth/login', { login, password })

        // console.log(data)
      } catch (e) {
        // console.log(e.response)
      }
    }
  },
  modules: {
  }
})
