import { mapGetters } from 'vuex'

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
    const [ clickedListId, listOfTodayTasksId ] = [ this.getters.clickedList.id, this.getters.listOfTodayTasks.id ]
    if (clickedListId === listOfTodayTasksId) {
      taskOptions.date = this.getDateOfToday()
    }
    commit('UPDATE_TASK_OPTIONS', taskOptions)
  },
}

const getters = {
  taskOptions: state => state.taskOptions,
  getDateOfToday() {
    const [year, month, day] = new Date().toLocaleDateString().split('/')
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  }
}

const taskOptionsModule = {
  state,
  mutations,
  actions,
  getters,
}

export default taskOptionsModule
