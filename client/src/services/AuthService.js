import { get, post } from './ApiService'

function login (credentials) {
  return post('auth/login', credentials)
}

async function register (credentials) {
  const result = await post('users', credentials)
  if (result.code === '23505') {
    // duplicate key value
    if (result.detail.includes('Key (email)')) {
      result.error = 'email already exists'
    }
    if (result.detail.includes('Key (name)')) {
      result.error = 'name already exists'
    }
  }
  return result
}

function ltilogin (credentials) {
  return post('lti/auth/ltilogin', credentials)
}

function getProfile () {
  return get('auth/profile')
}

export { login, register, ltilogin, getProfile }
