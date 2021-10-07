import { Task } from 'src/tasks/task.entity'
import { Submission } from '../../submissions/submission.entity'


function evaluate(submission: Submission, task: Task): any {
  let solution: any
  let details: any
  let grade: Number
  solution = submission.solution
  details = task.details
  let correct = Number(details.number1) + Number(details.number2)
  grade = correct === Number(solution.value) ? 1 : 0
  return { grade, feedback: {} };
}

export { evaluate }