import { createStore } from 'vuex'

import auth from './auth.js'
import users from './users.js'
import classrooms from './classrooms.js'
import schools from './schools.js'
import exercises from './exercises.js'
import results from './results.js'

export default createStore({
  modules: { auth, users, classrooms, schools, exercises, results }
})
