import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import list from '@/store/modules/list'
import listMenu from '@/store/modules/listMenu'
import listPopup from '@/store/modules/listPopup'
import task from '@/store/modules/task'
import taskMenu from '@/store/modules/taskMenu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    list,
    listMenu,
    listPopup,
    task,
    taskMenu,
  }
})
