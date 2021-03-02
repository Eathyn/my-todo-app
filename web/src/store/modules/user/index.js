import http from '@/http'

const state = {
  user: {}
}

const mutations = {
  UPDATE_USER(state, user) {
    state.user = user
  },
}

const actions = {
  async getUserInfo({ commit }) {
    const res = await http.get('/user')
    commit('UPDATE_USER', res.data)
  },
}

const getters = {
  user: state => state.user,
}

const userModule = {
  state,
  mutations,
  actions,
  getters,
}

export default userModule
