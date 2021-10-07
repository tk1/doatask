import { Task } from 'src/tasks/task.entity'
import { Submission } from '../../submissions/submission.entity'


function evaluate(submission: Submission, task: Task): any {
  let solution: any
  let details: any
  let grade: Number
  solution = submission.solution
  details = task.details
  let correct = Number(details.number) ** 2
  let solutionValue = Number(solution.value)
  let diff = Math.abs(correct - solutionValue) / correct
  grade = Math.max(0, 1 - diff)
  return { grade, feedback: {} };
}

export { evaluate }