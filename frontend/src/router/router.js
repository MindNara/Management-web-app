import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Task from '../views/Task.vue'
import Notediary from '../views/NoteDiary.vue'
import Schedule from '../views/Schedule.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      meta: { guess: true },
      component: Homepage
    },
    {
      path: '/Dashboard',
      name: 'dashboard',
      meta: { login: true },
      component: Dashboard,
    },
    {
      path: '/Login',
      name: 'login',
      meta: { guess: true },
      component: Login
    },
    {
      path: '/Signup',
      name: 'signup',
      meta: { guess: true },
      component: Signup
    },
    {
      path: '/Task',
      name: 'task',
      meta: { login: true },
      component: Task
    },
    {
      path: '/NoteDiary',
      name: 'notediary',
      meta: { login: true },
      component: Notediary
    },
    {
      path: '/Schedule',
      name: 'schedule',
      meta: { login: true },
      component: Schedule
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token');

  if (to.meta.login && !isLoggedIn) {
    alert('Please Login First!');
    next({ path: '/Login' });
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've Already Logged In");
    next({ path: '/Dashboard' });
  }

  next()
})

export default router
