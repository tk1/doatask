import { CodeTest } from '../../code-tests/code-test';
import { CodeTestSuite } from '../../code-tests/code-test-suite';
import { MethodStub } from '../../method-stub';
import { JavaScriptEvaluator } from '../../code-evaluators/javascript/java-script-evaluator';
import { CodeTypes } from '../../code-types';
import { Tmp } from '../test-method-parameters';

describe('JavaScript code evaluator', () => {

  test('Empty code solution', async () => {

    const methodStub = new MethodStub("testFunction", [], CodeTypes.booleanType)
    const testSuite = new CodeTestSuite([new CodeTest([], true), new CodeTest([], true)], [])

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator("", methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
  });

  test('Syntax error in code solution', async () => {

    const methodStub = new MethodStub("testFunction", [], CodeTypes.booleanType)
    const testSuite = new CodeTestSuite([new CodeTest([], true)], [])

    const codeSolution = "function testFunction() { retrun false; }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
  });

  test('Missing return in code solution', async () => {

    const methodStub = new MethodStub("testFunction", [], CodeTypes.booleanType)
    const testSuite = new CodeTestSuite([new CodeTest([], true), new CodeTest([], true)], [new CodeTest([], false)])

    const codeSolution = "function testFunction() { let x = false; }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
  });

  test('boolean input parameter (not function)', async () => {

    const methodStub = new MethodStub("not", [Tmp.booleanParam], CodeTypes.booleanType)
    const testSuite = new CodeTestSuite([new CodeTest([false], true)], [new CodeTest([true], false)])
    const codeSolution = "function not(input) { return !input }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('int input parameter (substract function)', async () => {

    const methodStub = new MethodStub("substract", [Tmp.intParam, Tmp.intParam2], CodeTypes.intType)
    const testSuite = new CodeTestSuite([new CodeTest([1, 2], -1), new CodeTest([-1, -3], 2)], [new CodeTest([3, 1], 2)])
    const codeSolution = "function substract(x,y) { return x-y; }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('string input parameter (concat function)', async () => {

    const methodStub = new MethodStub("stringConcat", [Tmp.stringParam1, Tmp.stringParam2], CodeTypes.stringType)
    const testSuite = new CodeTestSuite([new CodeTest(["1", "2"], "12"), new CodeTest(["a", "b"], "ab")], [new CodeTest(["", "test"], "test")])
    const codeSolution = "function stringConcat(x,y) { return x + y; }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()
    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('boolean array input parameter (logicalAnd function)', async () => {

    const methodStub = new MethodStub("logicalAnd", [Tmp.booleanArrayParam], CodeTypes.booleanType)
    const testSuite = new CodeTestSuite([new CodeTest([[true, false]], false), new CodeTest([[true, true, false]], false)], [new CodeTest([[true, true]], true)])
    const codeSolution = "function logicalAnd(input) {\n" +
      "var result = true;\n" +
      "for (var i = 0; i < input.length; i++) {\n" +
      "result = result && input[i];\n" +
      "}\n" +
      "return result;\n" +
      "}"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()
    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('int array input parameter (sumOfArray function)', async () => {

    const methodStub = new MethodStub("sumOfArray", [Tmp.intArrayParam], CodeTypes.intType)
    const testSuite = new CodeTestSuite([new CodeTest([[1, 2]], 3), new CodeTest([[0, 10, 100, 1]], 111)], [new CodeTest([[-1, 2, -3]], -2)])
    const codeSolution = "function sumOfArray(input) {\n" +
      "var result = 0;\n" +
      "for (var i = 0; i < input.length; i++) {\n" +
      "result = result + input[i];\n" +
      "}\n" +
      "return result;\n" +
      "}"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()
    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('string array input parameter (concatOfArray function)', async () => {

    const methodStub = new MethodStub("concatOfArray", [Tmp.stringArrayParam], CodeTypes.stringType)
    const testSuite = new CodeTestSuite([new CodeTest([["a", "b", "c"]], "abc"), new CodeTest([["1", "2", "3", "4"]], "1234")], [new CodeTest([["", "", ""]], "")])
    const codeSolution = "function concatOfArray(input) {\n" +
      "var result = '';\n" +
      "for (var i = 0; i < input.length; i++) {\n" +
      "result = result + input[i];\n" +
      "}\n" +
      "return result;\n" +
      "}"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()
    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('boolean array output parameter (isNumberEven function)', async () => {

    const methodStub = new MethodStub("isNumberEven", [Tmp.intArrayParam], CodeTypes.booleanArrayType)
    const testSuite = new CodeTestSuite([new CodeTest([[1, 2, 3]], [false, true, false]), new CodeTest([[4, 5, 6]], [true, false, true])], [new CodeTest([[-2, -4, 5]], [true, true, false])])
    const codeSolution = "function isNumberEven(input) {\n" +
      "var result = [];\n" +
      "for (var i = 0; i < input.length; i++) {\n" +
      "if(input[i] % 2 > 0) {\n" +
      "result.push(false);\n" +
      "} else {\n" +
      "result.push(true);\n" +
      "}\n" +
      "}\n" +
      "return result;\n" +
      "}"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()
    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('string array output parameter (isOddEven function)', async () => {

    const methodStub = new MethodStub("isOddEven", [Tmp.intArrayParam], CodeTypes.stringArrayType)
    const testSuite = new CodeTestSuite([new CodeTest([[1, 2, 3]], ['odd', 'even', 'odd']), new CodeTest([[4, 5, 6]], ['even', 'odd', 'even'])], [new CodeTest([[-2, -4, 5]], ['even', 'even', 'odd'])])
    const codeSolution = "function isOddEven(input) {\n" +
      "var result = [];\n" +
      "for (var i = 0; i < input.length; i++) {\n" +
      "if(input[i] % 2 > 0) {\n" +
      "result.push('odd');\n" +
      "} else {\n" +
      "result.push('even');\n" +
      "}\n" +
      "}\n" +
      "return result;\n" +
      "}"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()
    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('string array output parameter (addToEachNumber function)', async () => {

    const methodStub = new MethodStub("addToEachNumber", [Tmp.intArrayParam, Tmp.intParam], CodeTypes.intArrayType)
    const testSuite = new CodeTestSuite([new CodeTest([[1, 2, 3], 1], [2, 3, 4]), new CodeTest([[4, 5, 6], 0], [4, 5, 6])], [new CodeTest([[-2, -4, 5], -2], [-4, -6, 3])])
    const codeSolution = "function addToEachNumber(input, x) {\n" +
      "var result = [];\n" +
      "for (var i = 0; i < input.length; i++) {\n" +
      "result.push(input[i] + x);\n" +
      "}\n" +
      "return result;\n" +
      "}"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()
    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  //TODO add tests where the testPassed is false

});