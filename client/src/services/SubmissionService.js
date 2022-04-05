import { get, post } from './ApiService'

function getAll () {
  return get('submissions')
}

function getQuery (assignmentId, userId) {
  return get(`submissions?assignment=${assignmentId}&user=${userId}`)
}

function getSubmissionByAssignmentAndTask (assignmentId, taskId) {
  return get(`submissions?assignment=${assignmentId}&task=${taskId}`)
}

function save (submission) {
  if (submission.ltik) {
    return post('lti/submissions', submission)
  } else {
    return post('submissions', submission)
  }
}

export { getAll, getQuery, save, getSubmissionByAssignmentAndTask }
