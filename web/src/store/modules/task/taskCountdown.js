import http from '../../../http'

const state = {
  taskCountdown: null,
}

const mutations = {
  UPDATE_TASK_COUNTDOWN(state, taskCountdown) {
    state.taskCountdown = taskCountdown
  },
}

const actions = {
  async updateTaskCountdown({ commit }, taskId) {
    const res = await http.get(`/taskCountdown/${taskId}`)
    commit('UPDATE_TASK_COUNTDOWN', res.data)
  },
}

const getters = {
  taskCountdown: state => state.taskCountdown,
}

const taskCountdownModule = {
  state,
  mutations,
  actions,
  getters,
}

export default taskCountdownModule
