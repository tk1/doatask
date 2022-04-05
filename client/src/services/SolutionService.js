import { get, post } from './ApiService'

function getAll () {
  return get('solutions')
}

async function getSolutionByAssignmentAndTask (assignmentId, taskId) {
  return await get(`solutions?assignmentId=${assignmentId}&taskId=${taskId}`)
}

function getCurrentSolutionQuery (assignmentId, userId) {
  return get(`solutions/${userId}/${assignmentId}`)
}

function saveCurrentSolution (solution) {
  return post('solutions', solution)
}

export { getAll, getCurrentSolutionQuery, saveCurrentSolution, getSolutionByAssignmentAndTask }
