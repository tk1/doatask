import { Injectable } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { RunCodeDto } from './runCodeDto';
import { CodeTestResult } from '../code-tests/code-test-result';
import { CodeDto } from '../code.dto';
import { CodeEvaluator } from '../code-evaluator/code-evaluator';

@Injectable()
export class CodeService {

  constructor(private readonly tasksService: TasksService) { }

  async runPublicCodeTests(runCodeDto: RunCodeDto): Promise<Array<CodeTestResult>> {

    const task = await this.tasksService.findOne(runCodeDto.task)
    const details: CodeDto = new CodeDto()
    Object.assign(details, task.details)

    const codeEvaluator = new CodeEvaluator(runCodeDto.solutionCode, details)
    await codeEvaluator.runPublicTests()
    const result = codeEvaluator.getTestResults()
    return result
  }
}