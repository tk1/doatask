import { get, post, patch, del } from './ApiService'

function getAll () {
  return get('assignmenttasks')
}

function save (data) {
  return post('assignmenttasks', data)
}

function update (data) {
  return patch(`assignmenttasks/${data.id}`, data)
}

function remove (id) {
  return del(`assignmenttasks/${id}`)
}

export { getAll, save, update, remove }
