import { get, post, patch, del } from './ApiService'

const base = 'tasks'

function getAll () {
  return get(base)
}

function getAllForUser (id) {
  return get(`${base}/user/${id}`)
}

function getAllForStudent (id) {
  return get(`${base}/student/${id}`)
}

function getTasksForAssignment (assignmentId) {
  return get(`${base}/assignmentTask/${assignmentId}`)
}

function save (task) {
  return post(base, task)
}

function update (task) {
  return patch(`${base}/${task.id}`, task)
}

function remove (task) {
  return del(`${base}/${task.id}`)
}

function isInAssignment (id) {
  return get(`${base}/isInAssignment/${id}`)
}

export { getAll, getAllForUser, getAllForStudent, save, update, remove, getTasksForAssignment, isInAssignment }
