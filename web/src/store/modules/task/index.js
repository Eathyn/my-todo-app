import http from '@/http'

const state = {
  taskItems: [],

  // update when right click task item
  rightClickTaskId: null,

  // update when left click task item
  selectedTaskId: null,
}

const mutations = {
  UPDATE_TASK_ITEMS(state, taskItems) {
    state.taskItems = taskItems
  },
  UPDATE_RIGHT_CLICK_TASK_ID(state, taskId) {
    state.rightClickTaskId = taskId
  },
}

const actions = {
  async getTaskItems({ commit }, listId) {
    const res = await http.get(`/list/${listId}/task/all`)
    commit('UPDATE_TASK_ITEMS', res.data)
  },
  async addTaskItem({ commit }, payload) {
    const task = {
      name: payload.model.name,
      options: payload.taskOptions,
    }
    const res = await http.post(`/list/${payload.selected}/task`, task)
    commit('UPDATE_TASK_ITEMS', res.data)
  },
  deleteTaskItems({ commit }) {
    commit('UPDATE_TASK_ITEMS', [])
  },
  updateRightClickTaskId({ commit }, taskId) {
    commit('UPDATE_RIGHT_CLICK_TASK_ID', taskId)
  },
  async deleteTask({ commit }, payload) {
    const res = await http.delete(`/list/${payload.listId}/task/${payload.taskId}`)
    commit('UPDATE_TASK_ITEMS', res.data)
  }
}

const getters = {
  taskItems: state => state.taskItems,
  rightClickTaskId: state => state.rightClickTaskId,
  selectedTaskId: state => state.selectedTaskId,
}

const taskModule = {
  state,
  mutations,
  actions,
  getters,
}

export default taskModule
