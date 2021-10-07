import { get, post, patch, del } from './ApiService'

const base = 'domains'

function getAll () {
  return get(base)
}

function getOne (id) {
  if (id === undefined || id === null) {
    return {}
  } else {
    return get(`${base}/${id}`)
  }
}

function save (record) {
  return post(base, record)
}

function update (record) {
  return patch(`${base}/${record.id}`, record)
}

function remove (record) {
  return del(`${base}/${record.id}`)
}

export { getAll, getOne, save, update, remove }
