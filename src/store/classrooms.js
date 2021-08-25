import api from '@/api/index.js'

export default {
  namespaced: true,
  actions: {
    async fetchClassrooms(ctx, { page }) {
      return await api.get('/classrooms', {
        params: { page }
      })
    },
    async byId (_, { id }) {
      return await api.get(`/classrooms/${id}`)
    },
    async post (_, { body }) {
      return await api.post(`/classrooms`, body)
    },
    async patch (_, { id, body }) {
      return await api.patch(`/classrooms/${id}`, body)
    },
    async delete(_, { id }) {
      return await api.delete(`/classrooms/${id}`)
    }
  }
}
