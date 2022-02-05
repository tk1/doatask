import { get, post } from './ApiService'

function getAll () {
  return get('solutions')
}

function getCurrentSolutionQuery (assignmentId, userId) {
  return get(`solutions/${userId}/${assignmentId}`)
}

function saveCurrentSolution (solution) {
  console.log(solution)
  return post('solutions', solution)
}

export { getAll, getCurrentSolutionQuery, saveCurrentSolution }
