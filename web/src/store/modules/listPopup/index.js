const state = {
  seen: false,
  listItem: null,
}

const mutations = {
  UPDATE_SEEN(state, seen) {
    state.seen = seen
  },
  UPDATE_LIST_ITEM(state, listItem) {
    state.listItem = listItem
  },
}

const actions = {
  updateSeen({ commit }, seen) {
    commit('UPDATE_SEEN', seen)
  },
  updateListItem({ commit }, listItem) {
    commit('UPDATE_LIST_ITEM', listItem)
  },
}

const getters = {
  seen: state => state.seen,
  listItem: state => state.listItem,
}

const listPopupModule = {
  state,
  mutations,
  actions,
  getters,
}

export default listPopupModule
