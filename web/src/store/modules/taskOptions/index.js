const state = {
  taskOptions: null,
}

const mutations = {
  UPDATE_TASK_OPTIONS(state, taskOptions) {
    state.taskOptions = taskOptions
  },
}

const actions = {
  updateTaskOptions({ commit }, taskOptions) {
    commit('UPDATE_TASK_OPTIONS', taskOptions)
  },
}

const getters = {
  taskOptions: state => state.taskOptions,
}

const taskOptionsModule = {
  state,
  mutations,
  actions,
  getters,
}

export default taskOptionsModule
