const state = {
  taskOptions: {
    date: '',
    period: {
      startingTime: '',
      endTime: '',
    },
    duration: '',
  },
}

const mutations = {
  UPDATE_TASK_OPTIONS(state, taskOptions) {
    state.taskOptions = taskOptions
  },
}

const actions = {
  updateTaskOptions({ commit }, taskOptions = state.taskOptions) {
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
