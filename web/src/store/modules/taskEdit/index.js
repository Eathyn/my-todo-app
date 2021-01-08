const state = {
  taskEditToggle: false
}

const mutations = {
  UPDATE_TASK_EDIT_TOGGLE(state, toggle) {
    state.taskEditToggle = toggle
  }
}

const actions = {
  updateTaskEditToggle({ commit }, toggle) {
    commit('UPDATE_TASK_EDIT_TOGGLE', toggle)
  }
}

const getters = {
  taskEditToggle: state => state.taskEditToggle
}

const taskEditModule = {
  state,
  mutations,
  actions,
  getters,
}

export default taskEditModule
