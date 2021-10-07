import { get, post, patch, del } from './ApiService'

const base = 'assignments'

function getAll () {
  return get(base)
}

function getAllForUser (id) {
  return get(`${base}/user/${id}`)
}

function getOne (id) {
  if (id === undefined || id === null) {
    return {}
  } else {
    return get(`${base}/${id}`)
  }
}

function save (assignment) {
  return post(base, assignment)
}

function update (assignment) {
  return patch(`${base}/${assignment.id}`, assignment)
}

function remove (assignment) {
  return del(`${base}/${assignment.id}`)
}

export { getAll, getAllForUser, getOne, save, update, remove }
