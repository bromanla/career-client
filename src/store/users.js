import api from '@/api/index.js'

export default {
  namespaced: true,
  actions: {
    async all(_, { page }) {
      return await api.get('/users', {
        params: { page }
      })
    },
    async byId (_, { id }) {
      return await api.get(`/users/${id}`)
    },
    async post (_, { body }) {
      return await api.post(`/users`, body)
    },
    async patch (_, { id, body }) {
      return await api.patch(`/users/${id}`, body)
    },
    async delete(_, { id }) {
      return await api.delete(`/users/${id}`)
    }
  }
}
