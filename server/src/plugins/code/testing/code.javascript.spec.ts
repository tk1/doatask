import { Test, TestingModule } from '@nestjs/testing';
import { CodeTest } from '../code-tests/code-test';
import { CodeTestSuite } from '../code-tests/code-test-suite';
import { MethodParameter } from '../method-parameter';
import { MethodStub } from '../method-stub';
import { JavaScriptEvaluator } from '../code-evaluators/javascript/java-script-evaluator';

describe('JavaScript code evaluator', () => {

  const booleanParam = new MethodParameter("bParam1", "boolean")
  const stringParam1 = new MethodParameter("sParam1", "string")
  const stringParam2 = new MethodParameter("sParam2", "string")
  const intParam = new MethodParameter("nParam1", "int")
  const intParam2 = new MethodParameter("nParam2", "int")
  const booleanArrayParam = new MethodParameter("baParam1", "booleanArray")
  const stringArrayParam = new MethodParameter("saParam1", "stringArray")
  const intArrayParam = new MethodParameter("iaParam1", "intArray")

  const booleanType = "boolean"
  const stringType = "string"
  const intType = "int"
  const booleanArrayType = "booleanArray"
  const stringArrayType = "stringArray"
  const intArrayType = "intArray"

  test('Empty code solution', async () => {

    const methodStub = new MethodStub("testFunction", [], booleanType)
    const testSuite = new CodeTestSuite([new CodeTest([], true), new CodeTest([], true)], [])

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator("", methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
  });

  test('Syntax error in code solution', async () => {

    const methodStub = new MethodStub("testFunction", [], booleanType)
    const testSuite = new CodeTestSuite([new CodeTest([], true)], [])

    const codeSolution = "function testFunction() { retrun false; }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
  });

  test('Missing return in code solution', async () => {

    const methodStub = new MethodStub("testFunction", [], booleanType)
    const testSuite = new CodeTestSuite([new CodeTest([], true),new CodeTest([], true)], [new CodeTest([], false)])

    const codeSolution = "function testFunction() { let x = false; }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
  });

  test('boolean input parameter (not function)', async () => {

    const methodStub = new MethodStub("not", [booleanParam], booleanType)
    const testSuite = new CodeTestSuite([new CodeTest([false], true)], [new CodeTest([true], false)])
    const codeSolution = "function not(input) { return !input }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('int input parameter (substract function)', async () => {

    const methodStub = new MethodStub("substract", [intParam,intParam2], intType)
    const testSuite = new CodeTestSuite([new CodeTest([1,2], -1), new CodeTest([-1,-3], 2)], [new CodeTest([3,1], 2)])
    const codeSolution = "function substract(x,y) { return x-y; }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('string input parameter (concat function)', async () => {

    const methodStub = new MethodStub("stringConcat", [stringParam1,stringParam2], stringType)
    const testSuite = new CodeTestSuite([new CodeTest(["1","2"], "12"), new CodeTest(["a","b"], "ab")], [new CodeTest(["","test"], "test")])
    const codeSolution = "function stringConcat(x,y) { return x + y; }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('boolean array input parameter (logicalAnd function)', async () => {

    const methodStub = new MethodStub("logicalAnd", [booleanArrayParam], booleanType)
    const testSuite = new CodeTestSuite([new CodeTest([[true,false]], false), new CodeTest([[true,true,false]], false)], [new CodeTest([[true,true]], true)])
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
    console.log(testResults)
    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('int array input parameter (sumOfArray function)', async () => {

    const methodStub = new MethodStub("sumOfArray", [intArrayParam], intType)
    const testSuite = new CodeTestSuite([new CodeTest([[1,2]], 3), new CodeTest([[0,10,100,1]], 111)], [new CodeTest([[-1,2,-3]], -2)])
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

    const methodStub = new MethodStub("concatOfArray", [stringArrayParam], stringType)
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

    const methodStub = new MethodStub("isNumberEven", [intArrayParam], booleanArrayType)
    const testSuite = new CodeTestSuite([new CodeTest([[1,2,3]], [false,true,false]), new CodeTest([[4,5,6]], [true,false,true])], [new CodeTest([[-2,-4,5]], [true,true,false])])
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

    const methodStub = new MethodStub("isOddEven", [intArrayParam], booleanArrayType)
    const testSuite = new CodeTestSuite([new CodeTest([[1,2,3]], ['odd','even','odd']), new CodeTest([[4,5,6]], ['even','odd','even'])], [new CodeTest([[-2,-4,5]], ['even','even','odd'])])
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

    const methodStub = new MethodStub("addToEachNumber", [intArrayParam, intParam], intArrayType)
    const testSuite = new CodeTestSuite([new CodeTest([[1,2,3],1], [2,3,4]), new CodeTest([[4,5,6],0], [4,5,6])], [new CodeTest([[-2,-4,5],-2], [-4,-6,3])])
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
});