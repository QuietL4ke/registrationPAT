import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/main/index.vue'
import LoginPage from '@/pages/login/index.vue'
import RegisterPage from '@/pages/register/index.vue'
import ErrorPage from '@/pages/error/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: ErrorPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
