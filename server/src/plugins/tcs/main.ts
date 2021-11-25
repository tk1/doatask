import { Task } from 'src/tasks/task.entity'
import { Submission } from '../../submissions/submission.entity'
import * as Tcs from 'tcs-engine'


function evaluate(submission: Submission, task: Task): any {
  let solution: any = submission.solution
  let details: any = task.details

  let solutionWord = solution.value.text

  let grade = 0
  let r = Tcs.RegularExpression.parse(details.regexp)
  // minLength is missing in older tasks
  let minLength = details.minLength || 0

  let words = r.acceptedWords(minLength + 5)

  let firstWords = []
  let count = 0
  while (count < 4) {
    let w = words.next().value
    if (w === undefined) {
      break
    }
    if (w.length < minLength) {
      continue
    }
    else {
      if (w === '') {
        w = 'E' /* empty word */
      }
      firstWords.push(w)
      if (w === solutionWord) {
        grade = 1 - count * 0.25
      }
      count++
    }
  }
  let correct = 'The first four words are: ' + firstWords.join(' ')

  return {
    grade,
    feedback: {
      correct
    }
  };
}

export { evaluate }