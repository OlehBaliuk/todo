import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import ToDoList from '@/views/ToDoList.vue'
import store from '@/store'
import routePath from '@/constants/routes'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: { name: 'login' }
  },
  {
    path: routePath.login,
    name: 'login',
    component: LoginPage
  },
  {
    path: routePath.todo,
    name: 'toDoList',
    component: ToDoList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || Object.keys(store.state.user).length) {
    next()
  } else {
    next('/')
  }
})

export default router
