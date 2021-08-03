import api from '@/api/index.js'

export default {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    async fetchExercises(ctx, { page }) {
      const data = await api.get('/exercises', {
        params: { page }
      })

      return data
    },
  }
}
