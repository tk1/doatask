import { Task } from 'src/tasks/task.entity'
import { Submission } from '../../submissions/submission.entity'

function evaluate(submission: Submission, task: Task): any {
  let solution: any = submission.solution
  let details: any = task.details

  let correct = Number(details.number1) / Number(details.number2)
  let solutionValue = Number(solution.value.text)
  let diff = Math.abs(correct - solutionValue) / correct

  let grade = Math.max(0, 1 - diff / 100)

  return {
    grade,
    feedback: {
      correct
    }
  };
}

export { evaluate }