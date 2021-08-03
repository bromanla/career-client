import api from '@/api/index.js'

export default {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    async fetchSchools(ctx, { page }) {
      const data = await api.get('/schools', {
        params: { page }
      })

      return data
    },
  }
}
