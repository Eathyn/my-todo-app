import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import list from '@/store/modules/list'
import task from '@/store/modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    list,
    task,
  }
})
