import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.BASE_URL + 'api/'
})

function setToken (token) {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete instance.defaults.headers.common.Authorization
  }
}

function get (url, config = {}) {
  return instance.get(url, config)
    .then(res => res.data)
    .catch(error => ({ error }))
}

function post (url, data, config = {}) {
  return instance.post(url, data, config)
    .then(res => res.data)
    .catch(error => ({ error }))
}

function patch (url, data, config = {}) {
  return instance.patch(url, data, config)
    .then(res => res.data)
    .catch(error => ({ error }))
}

// not "delete" as this is a keyword in JavaScript
function del (url, config = {}) {
  return instance.delete(url, config)
    .then(res => res.data)
    .catch(error => ({ error }))
}

export { get, post, patch, del, setToken }
