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
    async byId (_, { id }) {
      try {
        return await api.get(`/schools/${id}`)
      } catch (err) {
        throw err
      }
    },
    async post (_, { body }) {
      try {
        return await api.post(`/schools`, body)
      } catch (err) {
        throw err
      }
    },
    async patch (_, { id, body }) {
      try {
        return await api.patch(`/schools/${id}`, body)
      } catch (err) {
        throw err
      }
    },
    async delete(_, { id }) {
      try {
        return await api.delete(`/schools/${id}`)
      } catch (err) {
        throw err
      }
    }
  }
}
