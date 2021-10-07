import { Submission } from '../../submissions/submission.entity'
import { Task } from '../../tasks/task.entity'
import { getDistance } from 'geolib'


function evaluate(submission: Submission, task: Task): any {
  let solution: any
  let correct: any
  let grade: Number
  let distance = 0
  solution = submission.solution
  if (!solution.value) {
    grade = 0
    distance = 0
  }
  else {
    correct = task.details
    distance = getDistance(
      {
        latitude: correct.lat,
        longitude: correct.lng
      },
      {
        latitude: solution.value.lat,
        longitude: solution.value.lng
      },
      10
    )
    if (distance < 1000) {
      grade = 1
    }
    else {
      grade = 1000 / distance
    }
  }
  return { grade, feedback: { distance } };
}

export { evaluate }