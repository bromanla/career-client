import api from '@/api/index.js'

export default {
  namespaced: true,
  actions: {
    async fetchExercises(ctx, { page }) {
      return await api.get('/exercises', {
        params: { page }
      })
    },
    async byId (_, { id }) {
      return await api.get(`/exercises/${id}`)
    }
  }
}
