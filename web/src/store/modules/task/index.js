import http from '@/http'

const state = {
  taskItems: [],
}

const mutations = {
  UPDATE_TASK_ITEMS(state, taskItems) {
    state.taskItems = taskItems
  }
}

const actions = {
  async getTaskItems({ commit }, listId) {
    const res = await http.get(`/list/${listId}/task/all`)
    commit('UPDATE_TASK_ITEMS', res.data)
  },
  async addTaskItem({ commit }, payload) {
    const res = await http.post(`/list/${payload.selected}/task`, payload.model)
    commit('UPDATE_TASK_ITEMS', res.data)
  },
}

const getters = {
  taskItems: state => state.taskItems
}

const taskModule = {
  state,
  mutations,
  actions,
  getters,
}

export default taskModule
