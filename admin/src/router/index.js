import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register'
import Login from '../views/Login'
import Main from '../views/Main'
import UserAdd from '../views/user/UserAdd'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Main,
    children: [
      { path: '/user/add', component: UserAdd },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
