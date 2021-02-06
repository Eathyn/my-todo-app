import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register'
import Login from '../views/Login'
import Main from '../views/Main'
import Personal from '../views/Personal'
import UserAdd from '../views/user/UserAdd'
import UserEdit from '../views/user/UserEdit'
import AdminAdd from '../views/admin/AdminAdd'
import AdminEdit from '../views/admin/AdminEdit'

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
      { path: '/personal', component: Personal },
      { path: '/user/add', component: UserAdd },
      { path: '/user/edit', component: UserEdit },
      { path: '/admin/add', component: AdminAdd },
      { path: '/admin/edit', component: AdminEdit },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
