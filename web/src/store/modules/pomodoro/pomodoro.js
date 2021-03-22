import http from '../../../http'

const state = {
  pomodoro: {
    minute: 0,
    second: 0,
    intervalId: 0,
  },
}

const mutations = {
  UPDATE_POMODORO(state, pomodoro) {
    state.pomodoro = pomodoro
  },

  START_COUNTDOWN(state) {
    const minute = state.pomodoro.minute

    state.intervalId = setInterval(() => {
      if (state.pomodoro.second > 0) {
        state.pomodoro.second--
      } else if (state.pomodoro.second === 0 && state.pomodoro.minute > 0) {
        state.pomodoro.minute--
        state.pomodoro.second = 59
      } else if (state.pomodoro.second === 0 && state.pomodoro.minute === 0) {
        // ending
        clearInterval(state.intervalId)

        // increment pomodoro amount
        this.getters.clickedTask.pomodoroAmount++
        this.getters.clickedTask.focusTime += minute

        // update database and task items
        const payload = {
          listId: this.getters.clickedList.id,
          task: this.getters.clickedTask,
        }
        this.dispatch('updateClickedTask', payload)

        // reset minute and second
        this.commit('UPDATE_POMODORO', {
          minute,
          second: 0,
        })
      }
    }, 1000)
  },
  STOP_COUNTDOWN(state) {
    clearInterval(state.intervalId)
  },
}

const actions = {
  async updatePomodoro({ commit }) {
    const res = await http.get('/pomodoro')
    commit('UPDATE_POMODORO', res.data)
  },
  startCountdown({ commit }) {
    commit('START_COUNTDOWN')
  },
  stopCountdown({ commit }) {
    commit('STOP_COUNTDOWN')
  },
}

const getters = {
  pomodoro: state => state.pomodoro,
  intervalId: state => state.pomodoro.intervalId,
  minute: state => state.pomodoro.minute,
  second: state => state.pomodoro.second,
  customClickedTask: (state, getters, rootState, rootGetters) => {
    return rootGetters['task/clickedTask']
  }
}

const pomodoroModule = {
  state,
  mutations,
  actions,
  getters,
}

export default pomodoroModule
