import { post } from './ApiService'

function runPublicTests (submission) {
  return post('code/runPublicCodeTests', submission)
}

export { runPublicTests }
