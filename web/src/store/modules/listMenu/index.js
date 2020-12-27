const state = {
  listItemMenu: {}
}

const mutations = {
  UPDATE_LIST_ITEM_MENU(state, listItemMenu) {
    state.listItemMenu = listItemMenu
  }
}

const actions = {
  updateListItemMenu({ commit }, listItemMenu) {
    commit('UPDATE_LIST_ITEM_MENU', listItemMenu)
  }
}

const getters = {
  listItemMenu: state => state.listItemMenu
}

const listMenuModule = {
  state,
  mutations,
  actions,
  getters,
}

export default listMenuModule
