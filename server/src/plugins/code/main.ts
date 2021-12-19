import { Task } from 'src/tasks/task.entity'
import { Submission } from '../../submissions/submission.entity'
import { CodeEvaluator } from './code-evaluator/code-evaluator';
import { CodeTestResult } from './code-tests/code-test-result';
import { CodeDto } from './code.dto';

async function evaluate(submission: Submission, task: Task): Promise<any> {

  let solution: string = submission.solution["value"]
  const details: CodeDto = new CodeDto()
  Object.assign(details, task.details)

  const codeEvaluator: CodeEvaluator = new CodeEvaluator(solution, details)
  await codeEvaluator.runAllTests()
  const testResults: CodeTestResult[] = codeEvaluator.getTestResults()
  //console.log(testResults)

  let numberOfPassedTests = testResults.filter(testResult => testResult.testPassed).length
  let grade = numberOfPassedTests / testResults.length

  return {
    grade,
    feedback: {
      numberOfPassedTests
    }
  };
}

async function test(code: string, task: Task): Promise<any> {
  const details: CodeDto = new CodeDto()
  Object.assign(details, task.details)

  const codeEvaluator: CodeEvaluator = new CodeEvaluator(code, details)
  await codeEvaluator.runAllTests()
  const testResults: CodeTestResult[] = codeEvaluator.getTestResults()
  return testResults
}

export { evaluate, test }

