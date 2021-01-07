const state = {
  taskMenu: {
    left: 0,
    top: 0,
    display: 'none',
  },
}

const mutations = {
  UPDATE_TASK_MENU(state, taskMenu) {
    state.taskMenu  = taskMenu
  },
}

const actions = {
  updateTaskMenu({ commit }, taskMenu) {
    commit('UPDATE_TASK_MENU', taskMenu)
  },
}

const getters = {
  taskMenu: state => state.taskMenu,
}

const taskMenuModule = {
  state,
  mutations,
  actions,
  getters,
}

export default taskMenuModule
