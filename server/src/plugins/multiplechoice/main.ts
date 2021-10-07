import { Task } from 'src/tasks/task.entity'
import { Submission } from '../../submissions/submission.entity'


function evaluate(submission: Submission, task: Task): any {
  let grade: Number

  let solution: any
  let details: any
  solution = submission.solution
  details = task.details
  const countCorrect = solution.value.reduce((acc, val, index) => acc + (val === details.private.answers[index].correct ? 1 : 0), 0)
  grade = countCorrect / solution.value.length
  return { grade, feedback: {} };
}

export { evaluate }