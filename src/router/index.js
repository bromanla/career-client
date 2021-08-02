import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/views/MainLayout.vue'
import UsersContent from '@/components/content/Users.vue'
import ClassroomsContent from '@/components/content/Classrooms.vue'
import SchoolsContent from '@/components/content/Schools.vue'
import ExercisesContent from '@/components/content/Exercises.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Layout,
    children: [
      {
        path: '',
        redirect: '/users'
      },
      {
        path: '/users',
        component: UsersContent,
        name: 'users',
        default: true
      },
      {
        path: '/schools',
        component: SchoolsContent,
        name: 'schools'
      },
      {
        path: '/classrooms',
        component: ClassroomsContent,
        name: 'classrooms'
      },
      {
        path: '/exercises',
        component: ExercisesContent,
        name: 'exercises'
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access') && localStorage.getItem('refresh') && localStorage.getItem('expiredAt'))
        next()
      else {
        localStorage.clear()

        next({
          name: 'login',
          params: {
            message: 'Войдите в систему!'
          }
        })
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
