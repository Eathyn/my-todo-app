import Vue from 'vue'
import router from './router'
import store from './store'
import http from './http'
import ECharts from 'vue-echarts'
import App from './App.vue'
import * as echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.component('v-chart', ECharts)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
