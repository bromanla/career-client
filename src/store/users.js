import api from '@/api/index.js'

export default {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    async all(_, { page }) {
      try {
        return await api.get('/users', {
          params: { page }
        })
      } catch (err) {
        throw err
      }
    },
    async byId (_, { id }) {
      try {
        return await api.get(`/users/${id}`)
      } catch (err) {
        throw err
      }
    },
    async post (_, { body }) {
      try {
        return await api.post(`/users`, body)
      } catch (err) {
        throw err
      }
    },
    async patch (_, { id, body }) {
      try {
        return await api.patch(`/users/${id}`, body)
      } catch (err) {
        throw err
      }
    },
    async delete(_, { id }) {
      try {
        return await api.delete(`/users/${id}`)
      } catch (err) {
        throw err
      }
    }
  }
}
