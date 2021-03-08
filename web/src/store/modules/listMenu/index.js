const state = {
  listMenuInfo: {
    left: 0,
    top: 0,
    seen: false,
  }
}

const mutations = {
  UPDATE_LIST_MENU_INFO(state, listMenuInfo) {
    state.listMenuInfo = listMenuInfo
  }
}

const actions = {
  toggleListMenu({ commit }, evt = null) {
    if (state.listMenuInfo.seen === true) {
      commit('UPDATE_LIST_MENU_INFO', {
        left: 0,
        top: 0,
        seen: false,
      })
    } else {
      commit('UPDATE_LIST_MENU_INFO', {
        left: evt.pageX,
        top: evt.pageY,
        seen: true,
      })
    }
  }
}

const getters = {
  listMenuInfo: state => state.listMenuInfo
}

const listMenuModule = {
  state,
  mutations,
  actions,
  getters,
}

export default listMenuModule
