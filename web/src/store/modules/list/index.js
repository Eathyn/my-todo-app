import http from '@/http'

const state = {
  listItems: [],
  selected: '',
}

const mutations = {
  UPDATE_LIST_ITEMS(state, payload) {
    state.listItems = payload
  },
  UPDATE_SELECTED(state, listId) {
    state.selected = listId
  }
}

const actions = {
  async getListItems({ commit }) {
    const res = await http.get('/list/all')
    commit('UPDATE_LIST_ITEMS', res.data)
  },
  async addListItem({ commit }, listItem) {
    const res = await http.post('/list', listItem)
    commit('UPDATE_LIST_ITEMS', res.data)
  },
  updateSelected({ commit }, listId) {
    commit('UPDATE_SELECTED', listId)
  },
  async modifyListItem({ commit }, listItem) {
    const res = await http.patch('/list', listItem)
    commit('UPDATE_LIST_ITEMS', res.data)
  },
  async deleteListItem({ commit }, listItem) {
    const res = await http.delete(`/list/${listItem.id}`)
    commit('UPDATE_LIST_ITEMS', res.data)
  }
}

const getters = {
  listItems: state => state.listItems,
  selected: state => state.selected,
}

const listModule = {
  state,
  mutations,
  actions,
  getters,
}

export default listModule
