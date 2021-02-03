import Vue from 'vue'
import router from './router'
import http from './http'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
