import { Task } from 'src/tasks/task.entity'
import { Submission } from '../../submissions/submission.entity'
import { CodeEvaluator } from './code-evaluators/code-evaluator';
import { CodeEvaluatorFactory } from './code-evaluators/code-evaluator-factory'
import { JavaScriptEvaluator } from './code-evaluators/java-script-evaluator'
import { CodeTestResults } from './code-tests/code-test-results';

function evaluate(submission: Submission, task: Task): any {

  let solution: any = submission.solution
  let details: any = task.details

  const codeEvaluator: CodeEvaluator = CodeEvaluatorFactory.getCodeEvaluator(details.language, solution.code, details.methodStub, details.testSuite);
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