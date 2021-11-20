import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Submission } from './submission.entity'
import { TasksService } from '../tasks/tasks.service'
import { RatingsService } from '../ratings/ratings.service'
import { AssignmentsService } from 'src/assignments/assignments.service';
import { AssignmentTasksService } from '../assignmenttasks/assignmenttasks.service';
import { LtiService } from '../lti/lti.service';
import { plugins } from '../plugins/list'
import { updateRating } from './rating'
import { CodeEvaluatorFactory } from 'src/plugins/code/code-evaluators/code-evaluator-factory';
import { CodeDto } from 'src/plugins/code/code.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionsRepository: Repository<Submission>,
    private readonly tasksService: TasksService,
    private readonly ratingsService: RatingsService,
    private readonly assignmentsService: AssignmentsService,
    private readonly assignmentTasksService: AssignmentTasksService,
    private readonly ltiService: LtiService
  ) { }

  async runPublicCodeTests(createSubmissionDto: CreateSubmissionDto): Promise<any> {
    const submission = new Submission();
    Object.assign(submission, createSubmissionDto);
    
    const task = await this.tasksService.findOne(createSubmissionDto.task)
    const details:CodeDto = new CodeDto()
    Object.assign(details, task.details)

    //const details = JSON.parse('{"language":"JavaScript","methodStub":{"functionName":"quadrat","parameter":[{"name":"n","type":"int"}],"returnType":"int"},"testSuite":{"publicTests":[{"testParameter":["0"],"expectedOutput":"0"},{"testParameter":["2"],"expectedOutput":"4"}],"secretTests":[{"testParameter":["-3"],"expectedOutput":"9"}]}}');

    const solution = submission.solution["value"]
    //const solution = "function quadrat(n) {return n*n}"

    if (createSubmissionDto.assignment < 0) {
      createSubmissionDto.assignment = null
    }
    
    const codeEvaluator = CodeEvaluatorFactory.createCodeEvaluator(details, solution)
    await codeEvaluator.runPublicTests()
    const result = codeEvaluator.getTestResults()    
    submission.feedback = result
    return submission.feedback
  }

  async create(createSubmissionDto: CreateSubmissionDto, ltiToken: any): Promise<Submission> {

    if (createSubmissionDto.assignment < 0) {
      createSubmissionDto.assignment = null
    }
    const submission = new Submission();
    Object.assign(submission, createSubmissionDto);
    if (submission.level === 'assignment') {
      // assignment submitted
      const totalResult = await this.calculateTotalResult(submission)
      submission.grade = totalResult
      if (ltiToken) {
        const assignment = await this.assignmentsService.findOne(Number(submission.assignment))
        const title = `${assignment.title} (id=${assignment.id})`
        const gradeResult = await this.ltiService.grade(ltiToken, 100 * submission.grade, title)
      }
      return this.submissionsRepository.save(submission);
    }
    const task = await this.tasksService.findOne(createSubmissionDto.task)
    const result = await plugins.get(submission.plugin.toLowerCase()).evaluate(submission, task)
    submission.grade = result.grade
    submission.feedback = result.feedback
    if (submission.rated) {
      submission.rating = await updateRating(
        this.ratingsService,
        this.tasksService,
        task,
        createSubmissionDto.user,
        result.grade
      )
    }
    return this.submissionsRepository.save(submission);
  }

  async calculateTotalResult(submission): Promise<number> {
    const submissions = await this.findAll({
      assignment: submission.assignment,
      user: submission.user,
      level: 'task'
    })
    const weightedGrades = submissions.reduce((sum, v) => sum + v.grade * v.assignmentTask.weight, 0)
    const tasks = await this.assignmentTasksService.findAll({ assignmentId: submission.assignment })
    const totalWeight = tasks.reduce((sum, v) => sum + v.weight, 0)
    return weightedGrades / totalWeight
  }

  findAll(query: any) {
    return this.submissionsRepository.find({ where: query, relations: ["assignmentTask"] })
  }

  findOne(id: number) {
    return this.submissionsRepository.findOne(id)
  }

  async update(id: number, updateSubmissionDto: UpdateSubmissionDto) {
    const toUpdate = await this.submissionsRepository.findOne(id)
    const updated = Object.assign(toUpdate, updateSubmissionDto)
    return this.submissionsRepository.save(updated)
  }

  remove(id: number) {
    return this.submissionsRepository.delete(id)
  }


}



