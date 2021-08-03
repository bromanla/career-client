import api from '@/api/index.js'

export default {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    async fetchClassrooms(ctx, { page }) {
      const data = await api.get('/classrooms', {
        params: { page }
      })

      return data
    },
  }
}
