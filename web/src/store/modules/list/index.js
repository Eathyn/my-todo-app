import http from '../../../http'

const state = {
  listItems: [],
  selected: '',
  selectedList: null,

  // the list contains all tasks
  listOfAllTasks: {},

  // the list contains tasks of today
  listOfTodayTasks: {},

  clickedList: {},
}

const mutations = {
  UPDATE_LIST_ITEMS(state, payload) {
    state.listItems = payload
  },
  UPDATE_SELECTED(state, listId) {
    state.selected = listId
  },
  UPDATE_SELECTED_LIST(state) {
    state.selectedList = state.listItems.find(listItem => listItem.id === state.selected)
  },

  UPDATE_CLICKED_LIST(state, list) {
    state.clickedList = list
  },

  UPDATE_LIST_OF_ALL_Tasks(state, listOfAllTasks) {
    state.listOfAllTasks = listOfAllTasks
  },

  UPDATE_LIST_OF_TODAY_TASKS(state, listOfTodayTasks) {
    state.listOfTodayTasks = listOfTodayTasks
  },
}

const actions = {
  async getListItems({ commit }) {
    const res = await http.get('/list/all')
    commit('UPDATE_LIST_ITEMS', res.data)
  },
  async addListItem({ commit }, listItem) {
    const res = await http.post('/list', listItem)
    commit('UPDATE_LIST_ITEMS', res.data)
  },
  updateSelected({ commit }, listId) {
    commit('UPDATE_SELECTED', listId)
  },
  async modifyListItem({ commit }, listItem) {
    const res = await http.patch('/list', listItem)
    commit('UPDATE_LIST_ITEMS', res.data)
  },
  async deleteListItem({ commit }, listItem) {
    const res = await http.delete(`/list/${listItem.id}`)
    commit('UPDATE_LIST_ITEMS', res.data)
  },
  updateSelectedList({ commit }) {
    commit('UPDATE_SELECTED_LIST')
  },
  async updateClickedList({ commit }, clickedListId) {
    const res = await http.get(`/list/${clickedListId}`)
    commit('UPDATE_CLICKED_LIST', res.data)
  },

  // get list of all tasks
  async getListOfAllTasks({ commit }) {
    const res = await http.get('/listOfAllTasks')
    await commit('UPDATE_LIST_OF_ALL_Tasks', res.data)
  },

  // get list of today tasks
  async getListOfTodayTasks({ commit }) {
    const res = await http.get('/listOfTodayTasks')
    await commit('UPDATE_LIST_OF_TODAY_TASKS', res.data)
  },
}

const getters = {
  listItems: state => state.listItems,
  selected: state => state.selected,
  selectedList: state => state.selectedList,
  listOfAllTasks: state => state.listOfAllTasks,
  listOfTodayTasks: state => state.listOfTodayTasks,
  clickedList: state => state.clickedList,
}

const listModule = {
  state,
  mutations,
  actions,
  getters,
}

export default listModule
