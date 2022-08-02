
import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    getToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async getToken(context, data) {
      const res = await login(data)
      context.commit('getToken', res)
    }
  }
}
