import { post } from './ApiService'

function runPublicTests (testsDto) {
  return post('tests/runTests', testsDto)
}

export { runPublicTests }
