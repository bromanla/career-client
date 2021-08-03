import api from '@/api/index.js'

export default {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    async fetchUsers(ctx, { page }) {
      const data = await api.get('/users', {
        params: { page }
      })

      return data
    },
  }
}
