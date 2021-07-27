import api from './instance.js'

async function login ({login, password}) {
  try {
    const { data } = await api.post('/auth/login', { login, password })

    return data
  } catch (error) {
    if (error.response) {

    } else {

    }
  }
}

export default {
  login
}
