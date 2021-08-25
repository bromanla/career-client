import api from '@/api/index.js'

export default {
  namespaced: true,
  actions: {
    async fetchSchools(ctx, { page }) {
      return await api.get('/schools', {
        params: { page }
      })
    },
    async byId (_, { id }) {
      return await api.get(`/schools/${id}`)
    },
    async post (_, { body }) {
      return await api.post(`/schools`, body)
    },
    async patch (_, { id, body }) {
      return await api.patch(`/schools/${id}`, body)
    },
    async delete(_, { id }) {
      return await api.delete(`/schools/${id}`)
    }
  }
}
