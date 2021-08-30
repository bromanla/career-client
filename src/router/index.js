import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store/index.js'

import Main from '@/views/Main.vue'
import Login from '@/views/Login.vue'

import UsersTable from '@/components/tables/Users.vue'
import ClassroomsTable from '@/components/tables/Classrooms.vue'
import SchoolsTable from '@/components/tables/Schools.vue'
import ExercisesTable from '@/components/tables/Exercises.vue'

import UsersContent from '@/components/content/Users.vue'
import ClassroomsContent from '@/components/content/Classrooms.vue'
import SchoolsContent from '@/components/content/Schools.vue'
import ExercisesContent from '@/components/content/Exercises.vue'

import NotFound from '@/components/NotFound.vue'

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
        component: UsersTable,
        name: 'usersTable',
        meta: { nav: 'users' }
      },
      {
        path: '/users/:id',
        component: UsersContent,
        name: 'usersContent',
        meta: { nav: 'users' }
      },
      {
        path: '/schools',
        component: SchoolsTable,
        name: 'schoolsTable',
        meta: { nav: 'schools' }
      },
      {
        path: '/schools/:id',
        component: SchoolsContent,
        name: 'schoolsContent',
        meta: { nav: 'schools' }
      },
      {
        path: '/classrooms',
        component: ClassroomsTable,
        name: 'classroomsTable',
        meta: { nav: 'classrooms' }
      },
      {
        path: '/classrooms/:id',
        component: ClassroomsContent,
        name: 'classroomsContent',
        meta: { nav: 'classrooms' }
      },
      {
        path: '/exercises',
        component: ExercisesTable,
        name: 'exercisesTable',
        meta: { nav: 'exercises' }
      },
      {
        path: '/exercises/:id',
        component: ExercisesContent,
        name: 'exercisesContent',
        meta: { nav: 'exercises' }
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
    component: Login
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
