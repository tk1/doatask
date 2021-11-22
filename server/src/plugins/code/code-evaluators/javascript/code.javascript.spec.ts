import { Test, TestingModule } from '@nestjs/testing';
import { CodeTest } from '../../code-tests/code-test';
import { CodeTestSuite } from '../../code-tests/code-test-suite';
import { MethodParameter } from '../../method-parameter';
import { MethodStub } from '../../method-stub';
import { JavaScriptEvaluator } from './java-script-evaluator';

describe('JavaScript code evaluator', () => {

    const booleanParam = new MethodParameter("bParam1", "boolean")
    const stringParam1 = new MethodParameter("sParam1", "string")
    const stringParam2 = new MethodParameter("sParam2", "string")
    const intParam = new MethodParameter("nParam1", "int")
    const intParam2 = new MethodParameter("nParam2", "int")
    const booleanArrayParam = new MethodParameter("baParam1", "booleanArray")
    const stringArrayParam = new MethodParameter("saParam1", "stringArray")
    const intArrayParam = new MethodParameter("iaParam1", "intArray")


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    }).compile();
  });

  test('Empty code solution', async () => {

    const methodStub = new MethodStub("testFunction", [], "boolean")
    const testSuite = new CodeTestSuite([new CodeTest([], true), new CodeTest([], true)], [])

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator("", methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
  });

  test('Syntax error in code solution', async () => {

    const methodStub = new MethodStub("testFunction", [], "boolean")
    const testSuite = new CodeTestSuite([new CodeTest([], true)], [])

    const codeSolution = "function testFunction() { retrun false; }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
  });

  test('Missing return in code solution', async () => {

    const methodStub = new MethodStub("testFunction", [], "boolean")
    const testSuite = new CodeTestSuite([new CodeTest([], true),new CodeTest([], true)], [new CodeTest([], false)])

    const codeSolution = "function testFunction() { let x = false; }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
  });

  test('boolean input parameter (not function)', async () => {

    const methodStub = new MethodStub("not", [booleanParam], "boolean")
    const testSuite = new CodeTestSuite([new CodeTest([false], true)], [new CodeTest([true], false)])
    const codeSolution = "function not(input) { return !input }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('int input parameter (substract function)', async () => {

    const methodStub = new MethodStub("substract", [intParam,intParam2], "int")
    const testSuite = new CodeTestSuite([new CodeTest([1,2], -1), new CodeTest([-1,-3], 2)], [new CodeTest([3,1], 2)])
    const codeSolution = "function substract(x,y) { return x-y; }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

  test('string input parameter (concat function)', async () => {

    const methodStub = new MethodStub("stringConcat", [stringParam1,stringParam2], "string")
    const testSuite = new CodeTestSuite([new CodeTest(["1","2"], "12"), new CodeTest(["a","b"], "ab")], [new CodeTest(["","test"], "test")])
    const codeSolution = "function stringConcat(x,y) { return x + y; }"

    const jsCodeEvaluator: JavaScriptEvaluator = new JavaScriptEvaluator(codeSolution, methodStub, testSuite)
    await jsCodeEvaluator.runAllTests()
    const testResults = jsCodeEvaluator.getTestResults()

    testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
  });

    // TODO boolean array
    // TODO int array
    // TODO string array 
});