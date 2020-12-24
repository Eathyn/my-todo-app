import http from '@/http'

const state = {
  userItem: {}
}

const mutations = {
  UPDATE_USER_ITEM(state, payload) {
    state.userItem = payload
  },
}

const actions = {
  async getUser({ commit }) {
    const res = await http.get('/user')
    commit('UPDATE_USER_ITEM', res.data)
  },
}

const getters = {
  user: state => state.userItem,
}

const userModule = {
  state,
  mutations,
  actions,
  getters,
}

export default userModule
