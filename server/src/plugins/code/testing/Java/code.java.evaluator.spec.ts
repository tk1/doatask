import { CodeTest } from '../../code-tests/code-test';
import { CodeTestSuite } from '../../code-tests/code-test-suite';
import { MethodStub } from '../../method-stub';
import { CodeTypes } from '../../code-types';
import { Tmp } from '../test-method-parameters';
import { CodeEvaluator } from '../../code-evaluator/code-evaluator';
import { CodeDto } from '../../code.dto';
import { DockerContainerManager } from '../../code-runner/docker-container-manager';

describe('Java code evaluator', () => {

  DockerContainerManager.init('docker-compose.yml')
  const codeDto = new CodeDto()
  codeDto.language = 'Java'

  beforeEach(() => {
    codeDto.methodStub = undefined
    codeDto.testSuite = undefined
  });

  test('Empty code solution', async () => {

    codeDto.methodStub = new MethodStub("testFunction", [], CodeTypes.booleanType)
    codeDto.testSuite = new CodeTestSuite([new CodeTest([], true), new CodeTest([], true)], [])
    const javaCodeEvaluator: CodeEvaluator = new CodeEvaluator("", codeDto)

    await javaCodeEvaluator.runAllTests()
    const testResults = javaCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
  });

  test('Syntax error in code solution', async () => {

    codeDto.methodStub = new MethodStub("testFunction", [], CodeTypes.booleanType)
    codeDto.testSuite = new CodeTestSuite([new CodeTest([], true)], [])
    const codeSolution = "boolean testFunction() { retrun false; }"
    const javaCodeEvaluator: CodeEvaluator = new CodeEvaluator(codeSolution, codeDto)

    await javaCodeEvaluator.runAllTests()
    const testResults = javaCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
  });

  test('Missing return in code solution', async () => {

    codeDto.methodStub = new MethodStub("testFunction", [], CodeTypes.booleanType)
    codeDto.testSuite = new CodeTestSuite([new CodeTest([], true), new CodeTest([], true)], [new CodeTest([], false)])
    const codeSolution = "boolean testFunction() { boolean x = false; }"
    const javaCodeEvaluator: CodeEvaluator = new CodeEvaluator(codeSolution, codeDto)

    await javaCodeEvaluator.runAllTests()
    const testResults = javaCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
  });

  test('boolean input parameter (not function)', async () => {

    codeDto.methodStub = new MethodStub("not", [Tmp.booleanParam], CodeTypes.booleanType)
    codeDto.testSuite = new CodeTestSuite([new CodeTest([false], true)], [new CodeTest([true], false)])
    const codeSolution = "boolean not(boolean input) { return !input; }"
    const javaCodeEvaluator: CodeEvaluator = new CodeEvaluator(codeSolution, codeDto)

    await javaCodeEvaluator.runAllTests()
    const testResults = javaCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('int input parameter (substract function)', async () => {

    codeDto.methodStub = new MethodStub("substract", [Tmp.intParam, Tmp.intParam2], CodeTypes.intType)
    codeDto.testSuite = new CodeTestSuite([new CodeTest([1, 2], -1), new CodeTest([-1, -3], 2)], [new CodeTest([3, 1], 2)])
    const codeSolution = "int substract(int x, int y) { return x-y; }"
    const javaCodeEvaluator: CodeEvaluator = new CodeEvaluator(codeSolution, codeDto)

    await javaCodeEvaluator.runAllTests()
    const testResults = javaCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('string input parameter (concat function)', async () => {

    codeDto.methodStub = new MethodStub("stringConcat", [Tmp.stringParam1, Tmp.stringParam2], CodeTypes.stringType)
    codeDto.testSuite = new CodeTestSuite([new CodeTest(["1", "2"], "12"), new CodeTest(["a", "b"], "ab")], [new CodeTest(["", "test"], "test")])
    const codeSolution = "String stringConcat(String x, String y) { return x + y; }"
    const javaCodeEvaluator: CodeEvaluator = new CodeEvaluator(codeSolution, codeDto)

    await javaCodeEvaluator.runAllTests()
    const testResults = javaCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('boolean array input parameter (logicalAnd function)', async () => {

    codeDto.methodStub = new MethodStub("logicalAnd", [Tmp.booleanArrayParam], CodeTypes.booleanType)
    codeDto.testSuite = new CodeTestSuite([new CodeTest([[true, false]], false), new CodeTest([[true, true, false]], false)], [new CodeTest([[true, true]], true)])
    const codeSolution = `boolean logicalAnd(boolean[] input) {
      boolean result = true;
      for (int i = 0; i < input.length; i++) {
      result = result && input[i];
      }
      return result;
      }`
    const javaCodeEvaluator: CodeEvaluator = new CodeEvaluator(codeSolution, codeDto)

    await javaCodeEvaluator.runAllTests()
    const testResults = javaCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('int array input parameter (sumOfArray function)', async () => {

    codeDto.methodStub = new MethodStub("sumOfArray", [Tmp.intArrayParam], CodeTypes.intType)
    codeDto.testSuite = new CodeTestSuite([new CodeTest([[1, 2]], 3), new CodeTest([[0, 10, 100, 1]], 111)], [new CodeTest([[-1, 2, -3]], -2)])
    const codeSolution = `int sumOfArray(int[] input) {
      int result = 0;
      for (int i = 0; i < input.length; i++) {
        result = result + input[i];
      }
      return result;
      }`
    const javaCodeEvaluator: CodeEvaluator = new CodeEvaluator(codeSolution, codeDto)

    await javaCodeEvaluator.runAllTests()
    const testResults = javaCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('string array input parameter (concatOfArray function)', async () => {

    codeDto.methodStub = new MethodStub("concatOfArray", [Tmp.stringArrayParam], CodeTypes.stringType)
    codeDto.testSuite = new CodeTestSuite([new CodeTest([["a", "b", "c"]], "abc"), new CodeTest([["1", "2", "3", "4"]], "1234")], [new CodeTest([["", "", ""]], "")])
    const codeSolution = `String concatOfArray(String[] input) {
      String result = "";
      for (var i = 0; i < input.length; i++) {
      result = result + input[i];
      }
      return result;
      }`
    const javaCodeEvaluator: CodeEvaluator = new CodeEvaluator(codeSolution, codeDto)

    await javaCodeEvaluator.runAllTests()
    const testResults = javaCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('boolean array output parameter (isNumberEven function)', async () => {

    codeDto.methodStub = new MethodStub("isNumberEven", [Tmp.intArrayParam], CodeTypes.booleanArrayType)
    codeDto.testSuite = new CodeTestSuite([new CodeTest([[1, 2, 3]], [false, true, false]), new CodeTest([[4, 5, 6]], [true, false, true])], [new CodeTest([[-2, -4, 5]], [true, true, false])])
    const codeSolution = `boolean[] isNumberEven(int[] input) {
      boolean[] result = new boolean[input.length];
      for (int i = 0; i < input.length; i++) {
        if(input[i] % 2 > 0) {
          result[i] = false;
        } else {
          result[i] = true;
        }
      }
      return result;
      }`
    const javaCodeEvaluator: CodeEvaluator = new CodeEvaluator(codeSolution, codeDto)

    await javaCodeEvaluator.runAllTests()
    const testResults = javaCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('string array output parameter (isOddEven function)', async () => {

    codeDto.methodStub = new MethodStub("isOddEven", [Tmp.intArrayParam], CodeTypes.stringArrayType)
    codeDto.testSuite = new CodeTestSuite([new CodeTest([[1, 2, 3]], ['odd', 'even', 'odd']), new CodeTest([[4, 5, 6]], ['even', 'odd', 'even'])], [new CodeTest([[-2, -4, 5]], ['even', 'even', 'odd'])])
    const codeSolution = `String[] isOddEven(int[] input) {
      String[] result = new String[input.length];
      for (int i = 0; i < input.length; i++) {
        if(input[i] % 2 > 0) {
          result[i] = "odd";
        } else {
          result[i] = "even";
        }
      }
      return result;
      }`
    const javaCodeEvaluator: CodeEvaluator = new CodeEvaluator(codeSolution, codeDto)

    await javaCodeEvaluator.runAllTests()
    const testResults = javaCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('string array output parameter (addToEachNumber function)', async () => {

    codeDto.methodStub = new MethodStub("addToEachNumber", [Tmp.intArrayParam, Tmp.intParam], CodeTypes.intArrayType)
    codeDto.testSuite = new CodeTestSuite([new CodeTest([[1, 2, 3], 1], [2, 3, 4]), new CodeTest([[4, 5, 6], 0], [4, 5, 6])], [new CodeTest([[-2, -4, 5], -2], [-4, -6, 3])])
    const codeSolution = `int[] addToEachNumber(int[] input, int x) {
      int[] result = new int[input.length];
      for (int i = 0; i < input.length; i++) {
        result[i] = input[i] + x;
      }
      return result;
      }`
    const javaCodeEvaluator: CodeEvaluator = new CodeEvaluator(codeSolution, codeDto)

    await javaCodeEvaluator.runAllTests()
    const testResults = javaCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  //TODO add tests where the testPassed is false
});