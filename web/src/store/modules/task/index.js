import http from '@/http'

const state = {
  taskItems: [],
  // update when click a task
  clickedTaskId: '',
  // showing the task details for TaskEdit and TaskDetails components when click a task
  clickedTask: null,
}

const mutations = {
  UPDATE_TASK_ITEMS(state, taskItems) {
    state.taskItems = taskItems
  },

  UPDATE_CLICKED_TASK_ID(state, taskId) {
    state.clickedTaskId = taskId
  },
  UPDATE_CLICKED_TASK(state, task) {
    state.clickedTask = task
  },

  // for editing task
  UPDATE_TASK_NAME(state, name) {
    state.clickedTask.name = name
  },
  UPDATE_TASK_DATE(state, date) {
    state.clickedTask.options.date = date
  },
  UPDATE_TASK_STARTING_TIME(state, startingTime) {
    state.clickedTask.options.period.startingTime = startingTime
  },
  UPDATE_TASK_END_TIME(state, endTime) {
    state.clickedTask.options.period.endTime = endTime
  },
  UPDATE_TASK_DURATION(state, duration) {
    state.clickedTask.options.duration = duration
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

  updateClickedTaskId({ commit }, taskId) {
    commit('UPDATE_CLICKED_TASK_ID', taskId)
  },
  async updateClickedTask({ commit }, payload) {
    const res = await http.patch(`/list/${payload.listId}/task/${payload.task.id}`,
      payload.task)
    commit('UPDATE_TASK_ITEMS', res.data)
  },
  async getClickedTask({ commit }, taskId) {
    const res = await http.get(`/task/${taskId}`)
    commit('UPDATE_CLICKED_TASK', res.data)
  },

  async deleteTask({ commit }, payload) {
    const res = await http.delete(`/list/${payload.listId}/task/${payload.taskId}`)
    commit('UPDATE_TASK_ITEMS', res.data)
  },
}

const getters = {
  taskItems: state => state.taskItems,
  clickedTaskId: state => state.clickedTaskId,
  clickedTask: state => state.clickedTask,
}

const taskModule = {
  state,
  mutations,
  actions,
  getters,
}

export default taskModule
