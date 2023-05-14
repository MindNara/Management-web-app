import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Task from '../views/Task.vue'
import Notediary from '../views/NoteDiary.vue'
import Schedule from '../views/Schedule.vue'
// import { Homepage, Dashboard, Login, Logout } from '../views/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/Dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/Task',
      name: 'task',
      component: Task
    },
    {
      path: '/NoteDiary',
      name: 'notediary',
      component: Notediary
    },
    {
      path: '/Schedule',
      name: 'schedule',
      component: Schedule
    },
  ]
})

export default router
