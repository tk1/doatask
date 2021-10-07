import { get } from './ApiService'

const base = 'ratings'

function getAllForUser (id) {
  return get(`${base}/user/${id}/all`)
}

function getLatestForUser (id) {
  return get(`${base}/user/${id}/latest`)
}

function getTop (count, domainId) {
  return get(`${base}/top/${count}/${domainId}`)
}

export { getAllForUser, getLatestForUser, getTop }
