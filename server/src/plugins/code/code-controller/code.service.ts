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

    //const details = JSON.parse('{"language":"JavaScript","methodStub":{"functionName":"quadrat","parameter":[{"name":"n","type":"int"}],"returnType":"int"},"testSuite":{"publicTests":[{"testParameter":["0"],"expectedOutput":"0"},{"testParameter":["2"],"expectedOutput":"4"}],"secretTests":[{"testParameter":["-3"],"expectedOutput":"9"}]}}');
    //const solution = "function quadrat(n) {return n*n}"

    const codeEvaluator = new CodeEvaluator(runCodeDto.solutionCode, details)
    await codeEvaluator.runPublicTests()
    const result = codeEvaluator.getTestResults()
    return result
  }
}