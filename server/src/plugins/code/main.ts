import { Task } from 'src/tasks/task.entity'
import { Submission } from '../../submissions/submission.entity'
import { CodeEvaluator } from './code-evaluators/code-evaluator';
import { CodeEvaluatorFactory } from './code-evaluators/code-evaluator-factory'
import { CodeTestResult } from './code-tests/code-test-result';
import { CodeDto } from './code.dto';

async function evaluate(submission: Submission, task: Task): Promise<any> {

  let solution: string = submission.solution["value"]
  //task.details = JSON.parse('{"language":"JavaScript","methodStub":{"functionName":"quadrat","parameter":[{"name":"n","type":"int"}],"returnType":"int"},"testSuite":{"publicTests":[{"testParameter":["0"],"expectedOutput":"0"},{"testParameter":["2"],"expectedOutput":"4"}],"secretTests":[{"testParameter":["-3"],"expectedOutput":"9"}]}}');
  //task.details = JSON.parse('{"language":"JavaScript","methodStub":{"functionName":"power","parameter":[{"name":"base","type":"int"},{"name":"exp","type":"int"}],"returnType":"int"},"testSuite":{"publicTests":[{"testParameter":["0","0"],"expectedOutput":"1"},{"testParameter":["2","2"],"expectedOutput":"4"},{"testParameter":["3","5"],"expectedOutput":"243"}],"secretTests":[{"testParameter":["-3","2"],"expectedOutput":"9"},{"testParameter":["-1","0"],"expectedOutput":"1"}]}}')
  //task.details = JSON.parse('{"language":"Python","methodStub":{"functionName":"sum","parameter":[{"name":"a","type":"int"},{"name":"b","type":"int"}],"returnType":"int"},"testSuite":{"publicTests":[{"testParameter":["0","0"],"expectedOutput":"0"},{"testParameter":["1","1"],"expectedOutput":"2"},{"testParameter":["-2","2"],"expectedOutput":"0"}],"secretTests":[{"testParameter":["-1","-1"],"expectedOutput":"-2"}]}}')

  const details:CodeDto = new CodeDto()
  Object.assign(details, task.details)

  //solution = "function quadrat(n) {return n*n}"
  //solution = "function power(base, exp) { let result = 1; for(let i = 0; i<exp; i++){ result *= base; } return result; }"
  // solution = 'def sum(a, b):\n\treturn a+b'

  const codeEvaluator: CodeEvaluator = CodeEvaluatorFactory.createCodeEvaluator(details, solution)
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

export { evaluate }