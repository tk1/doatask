import { Task } from 'src/tasks/task.entity'
import { Submission } from '../../submissions/submission.entity'
import { CodeEvaluator } from './code-evaluators/code-evaluator';
import { CodeEvaluatorFactory } from './code-evaluators/code-evaluator-factory'
import { JavaScriptEvaluator } from './code-evaluators/java-script-evaluator'
import { CodeTestResults } from './code-tests/code-test-results';
import { CodeDto } from './code.dto';

function evaluate(submission: Submission, task: Task): any {

  let solution: any = submission.solution
  task.details = JSON.parse('{"language":"JavaScript","methodStub":{"functionName":"quadrat","parameter":[{"name":"n","type":"int"}],"returnType":"int"},"testSuite":{"publicTests":[{"testParameter":["0"],"expectedOutput":"0"},{"testParameter":["2"],"expectedOutput":"4"}],"secretTests":[{"testParameter":["-3"],"expectedOutput":"9"}]}}');

  const details:CodeDto = new CodeDto()
  Object.assign(details, task.details)

  solution = "function quadrat(n) {return n*n}"

  const codeEvaluator: CodeEvaluator = CodeEvaluatorFactory.getCodeEvaluator(details, solution)
  codeEvaluator.runPublicTests();
  codeEvaluator.runSecrectTests;
  const testResults: CodeTestResults = codeEvaluator.getTestResults();

  let correct = null
  let grade = null

  return {
    grade,
    feedback: {
      correct
    }
  };
}

export { evaluate }