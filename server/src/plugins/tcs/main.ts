import { Task } from 'src/tasks/task.entity'
import { Submission } from '../../submissions/submission.entity'
import * as Tcs from 'tcs'


function evaluate(submission: Submission, task: Task): any {
  let solution: any = submission.solution
  let details: any = task.details

  let solutionWord = solution.value.text

  let grade = 0
  let r = Tcs.RegularExpression.parse(details.regexp)

  let words = r.acceptedWords(10)
  let firstWords = []
  for (let i = 0; i < 4; i++) {
    let w = words.next().value
    if (w === undefined) {
      break
    }
    else {
      firstWords.push(w || '1')
      if (w === solutionWord) {
        grade = 1 - i * 0.2
      }
    }
  }
  let correct = 'The first five words are: ' + firstWords.join(' ')

  return {
    grade,
    feedback: {
      correct
    }
  };
}

export { evaluate }