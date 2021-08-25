import api from '@/api/index.js'

export default {
  namespaced: true,
  actions: {
    async unloading() {
      return await api.get('/results/unloading')
    }
  }
}
