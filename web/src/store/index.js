import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import list from './modules/list'
import listMenu from './modules/listMenu'
import listPopup from './modules/listPopup'
import task from './modules/task'
import taskMenu from './modules/taskMenu'
import taskOptions from './modules/taskOptions'
import taskEdit from './modules/taskEdit'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    list,
    listMenu,
    listPopup,
    task,
    taskMenu,
    taskOptions,
    taskEdit,
  }
})
