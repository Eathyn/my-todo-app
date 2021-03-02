import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import Register from '../views/Register'
import Login from '../views/Login'
import Statistics from '../views/statistics/Statistics'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/statistics',
    component: Statistics,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
