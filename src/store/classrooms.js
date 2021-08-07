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
    async byId (_, { id }) {
      try {
        return await api.get(`/classrooms/${id}`)
      } catch (err) {
        throw err
      }
    },
    async patch (_, { id, body }) {
      try {
        return await api.patch(`/classrooms/${id}`, body)
      } catch (err) {
        throw err
      }
    },
    async delete(_, { id }) {
      try {
        return await api.delete(`/classrooms/${id}`)
      } catch (err) {
        throw err
      }
    }
  }
}
