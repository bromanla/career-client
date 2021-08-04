import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store/index.js'

import Main from '@/views/Main.vue'
import UsersContent from '@/components/content/Users.vue'
import ClassroomsContent from '@/components/content/Classrooms.vue'
import SchoolsContent from '@/components/content/Schools.vue'
import ExercisesContent from '@/components/content/Exercises.vue'
import NotFound from '@/components/content/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/',
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
      if(store.getters['auth/isAuth'])
        next()
      else {
        store.dispatch('auth/logout')

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
  },
  {
    path: '/404',
    component: Main,
    children: [
      {
        path: '',
        component: NotFound
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
