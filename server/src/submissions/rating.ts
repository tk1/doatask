import { Task } from '../tasks/task.entity'
import glicko2 = require('glicko2-lite')
import { Rating } from '../ratings/rating.entity'
import { RatingsService } from '../ratings/ratings.service'
import { TasksService } from '../tasks/tasks.service'
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';


// cf. http://glicko.net/glicko/glicko2.pdf Step 1(a)
const initialRating = {
  value: 1500,
  deviation: 350,
  volatility: 0.06,
  result: 0.5
}

async function updateRating(
  rs: RatingsService,
  ts: TasksService,
  task: Task,
  userId: number,
  grade: number
): Promise<number> {

  async function getRating(ownerid, type) {
    let rating: Rating
    const ratings = await rs.find({
      where: {
        type,
        ownerid,
        domain: task.domain.id,
        latest: true
      }
    })
    if (ratings.length === 0) {
      let newRating = new CreateRatingDto()
      Object.assign(newRating, initialRating)
      newRating.ownerid = ownerid
      newRating.type = type
      newRating.domain = task.domain.id
      newRating.latest = true
      rating = await rs.create(newRating)
    }
    else {
      rating = ratings[0]
    }
    return rating
  }

  let userRating = await getRating(userId, 'user')
  let taskRating = await getRating(task.id, 'task')

  let newUserRating = glicko2(userRating.value, userRating.deviation, userRating.volatility,
    [[taskRating.value, taskRating.deviation, grade]])
  let newTaskRating = glicko2(taskRating.value, taskRating.deviation, taskRating.volatility,
    [[userRating.value, userRating.deviation, 1 - grade]])

  let ur = {
    value: newUserRating.rating,
    deviation: newUserRating.rd,
    volatility: newUserRating.vol,
    result: grade,
    ownerid: userId,
    type: 'user',
    domain: task.domain.id,
    latest: true
  }

  let tr = {
    value: newTaskRating.rating,
    deviation: newTaskRating.rd,
    volatility: newTaskRating.vol,
    result: 1 - grade,
    ownerid: task.id,
    type: 'task',
    domain: task.domain.id,
    latest: true
  }

  userRating.latest = false
  taskRating.latest = false

  await rs.updateRecord(userRating)
  await rs.updateRecord(taskRating)

  await rs.create(ur)
  await rs.create(tr)

  task.rating = taskRating.value
  await ts.updateRecord(task)

  return ur.value
}

export { updateRating }