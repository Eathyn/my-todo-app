import http from '@/http'

const state = {
  taskItems: [],

  // update when right click task item
  rightClickTaskId: null,

  // update when left click task item
  selectedTaskId: null,

  taskItem: null,
}

const mutations = {
  UPDATE_TASK_ITEMS(state, taskItems) {
    state.taskItems = taskItems
  },
  UPDATE_RIGHT_CLICK_TASK_ID(state, taskId) {
    state.rightClickTaskId = taskId
  },
  UPDATE_TASK_ITEM(state, taskItem) {
    state.taskItem = taskItem
  },
  UPDATE_TASK_NAME(state, name) {
    state.taskItem.name = name
  },
  UPDATE_TASK_DATE(state, date) {
    state.taskItem.options.date = date
  },
  UPDATE_TASK_STARTING_TIME(state, startingTime) {
    state.taskItem.options.period.startingTime = startingTime
  },
  UPDATE_TASK_END_TIME(state, endTime) {
    state.taskItem.options.period.endTime = endTime
  },
  UPDATE_TASK_DURATION(state, duration) {
    state.taskItem.options.duration = duration
  }
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
  },
  async getEditedItem({ commit }, taskId) {
    const res = await http.get(`/task/${taskId}`)
    commit('UPDATE_TASK_ITEM', res.data)
  },
  async updateTaskItem({ commit }, payload) {
    const res = await http.patch(`/list/${payload.listId}/task/${payload.task.id}`,
      payload.task)
    commit('UPDATE_TASK_ITEMS', res.data)
  },
}

const getters = {
  taskItems: state => state.taskItems,
  rightClickTaskId: state => state.rightClickTaskId,
  selectedTaskId: state => state.selectedTaskId,
  taskItem: state => state.taskItem,
}

const taskModule = {
  state,
  mutations,
  actions,
  getters,
}

export default taskModule
