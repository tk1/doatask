import { CodeTest } from '../../code-tests/code-test';
import { CodeTestSuite } from '../../code-tests/code-test-suite';
import { MethodStub } from '../../method-stub';
import { CodeTypes } from '../../code-types';
import { Tmp } from '../test-method-parameters';
import { PythonEvaluator } from '../../code-evaluators/python/python-evaluator';

describe('Python code evaluator', () => {

    test('Empty code solution', async () => {

        const methodStub = new MethodStub("testFunction", [], CodeTypes.booleanType)
        const testSuite = new CodeTestSuite([new CodeTest([], true), new CodeTest([], true)], [])

        const pythonCodeEvaluator: PythonEvaluator = new PythonEvaluator("", methodStub, testSuite)
        await pythonCodeEvaluator.runAllTests()
        const testResults = pythonCodeEvaluator.getTestResults()

        testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
    });

    test('Syntax error in code solution', async () => {

        const methodStub = new MethodStub("testFunction", [], CodeTypes.booleanType)
        const testSuite = new CodeTestSuite([new CodeTest([], true)], [])

        const codeSolution = "def testFunction():\n\tretrun false"

        const pythonCodeEvaluator: PythonEvaluator = new PythonEvaluator(codeSolution, methodStub, testSuite)
        await pythonCodeEvaluator.runAllTests()
        const testResults = pythonCodeEvaluator.getTestResults()

        testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
    });

    test('Missing return in code solution', async () => {

        const methodStub = new MethodStub("testFunction", [], CodeTypes.booleanType)
        const testSuite = new CodeTestSuite([new CodeTest([], true), new CodeTest([], true)], [new CodeTest([], false)])

        const codeSolution = "def testFunction():\n\tx=false"

        const pythonCodeEvaluator: PythonEvaluator = new PythonEvaluator(codeSolution, methodStub, testSuite)
        await pythonCodeEvaluator.runAllTests()
        const testResults = pythonCodeEvaluator.getTestResults()

        testResults.forEach(testResult => expect(testResult.testPassed).toBeFalsy())
    });

    test('boolean input parameter (notF function)', async () => {

        // HINT: not is a keyword in Python
        const methodStub = new MethodStub("notF", [Tmp.booleanParam], CodeTypes.booleanType)
        const testSuite = new CodeTestSuite([new CodeTest([false], true)], [new CodeTest([true], false)])
        const codeSolution = "def notF(input):\n\treturn not input"

        const pythonCodeEvaluator: PythonEvaluator = new PythonEvaluator(codeSolution, methodStub, testSuite)
        await pythonCodeEvaluator.runAllTests()
        const testResults = pythonCodeEvaluator.getTestResults()
        console.log(testResults)
        testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
    });

    test('int input parameter (substract function)', async () => {

        const methodStub = new MethodStub("substract", [Tmp.intParam, Tmp.intParam2], CodeTypes.intType)
        const testSuite = new CodeTestSuite([new CodeTest([1, 2], -1), new CodeTest([-1, -3], 2)], [new CodeTest([3, 1], 2)])
        const codeSolution = "def substract(a,b):\n\treturn a-b"

        const pythonCodeEvaluator: PythonEvaluator = new PythonEvaluator(codeSolution, methodStub, testSuite)
        await pythonCodeEvaluator.runAllTests()
        const testResults = pythonCodeEvaluator.getTestResults()

        testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
    });

    test('string input parameter (concat function)', async () => {

        const methodStub = new MethodStub("stringConcat", [Tmp.stringParam1, Tmp.stringParam2], CodeTypes.stringType)
        const testSuite = new CodeTestSuite([new CodeTest(["1", "2"], "12"), new CodeTest(["a", "b"], "ab")], [new CodeTest(["", "test"], "test")])
        const codeSolution = "def stringConcat(a,b):\n\treturn a+b"

        const pythonCodeEvaluator: PythonEvaluator = new PythonEvaluator(codeSolution, methodStub, testSuite)
        await pythonCodeEvaluator.runAllTests()
        const testResults = pythonCodeEvaluator.getTestResults()
        testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
    });

    test('boolean array input parameter (logicalAnd function)', async () => {

        const methodStub = new MethodStub("logicalAnd", [Tmp.booleanArrayParam], CodeTypes.booleanType)
        const testSuite = new CodeTestSuite([new CodeTest([[true, false]], false), new CodeTest([[true, true, false]], false)], [new CodeTest([[true, true]], true)])
        const codeSolution = "def logicalAnd(input):\n" +
            "\tresult = True\n" +
            "\tfor i in input:\n" +
            "\t\tresult = result and i\n" +
            "\treturn result"

        const pythonCodeEvaluator: PythonEvaluator = new PythonEvaluator(codeSolution, methodStub, testSuite)
        await pythonCodeEvaluator.runAllTests()
        const testResults = pythonCodeEvaluator.getTestResults()
        testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
    });

    test('int array input parameter (sumOfArray function)', async () => {

        const methodStub = new MethodStub("sumOfArray", [Tmp.intArrayParam], CodeTypes.intType)
        const testSuite = new CodeTestSuite([new CodeTest([[1, 2]], 3), new CodeTest([[0, 10, 100, 1]], 111)], [new CodeTest([[-1, 2, -3]], -2)])
        const codeSolution = "def sumOfArray(input):\n" +
            "\tresult = 0\n" +
            "\tfor i in input:\n" +
            "\t\tresult = result + i\n" +
            "\treturn result"

        const pythonCodeEvaluator: PythonEvaluator = new PythonEvaluator(codeSolution, methodStub, testSuite)
        await pythonCodeEvaluator.runAllTests()
        const testResults = pythonCodeEvaluator.getTestResults()
        testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
    });

    test('string array input parameter (concatOfArray function)', async () => {

        const methodStub = new MethodStub("concatOfArray", [Tmp.stringArrayParam], CodeTypes.stringType)
        const testSuite = new CodeTestSuite([new CodeTest([["a", "b", "c"]], "abc"), new CodeTest([["1", "2", "3", "4"]], "1234")], [new CodeTest([["", "", ""]], "")])
        const codeSolution = "def concatOfArray(input):\n" +
            "\tresult = ''\n" +
            "\tfor i in input:\n" +
            "\t\tresult = result + i\n" +
            "\treturn result\n"

        const pythonCodeEvaluator: PythonEvaluator = new PythonEvaluator(codeSolution, methodStub, testSuite)
        await pythonCodeEvaluator.runAllTests()
        const testResults = pythonCodeEvaluator.getTestResults()
        testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
    });

    test('boolean array output parameter (isNumberEven function)', async () => {

        const methodStub = new MethodStub("isNumberEven", [Tmp.intArrayParam], CodeTypes.booleanArrayType)
        const testSuite = new CodeTestSuite([new CodeTest([[1, 2, 3]], [false, true, false]), new CodeTest([[4, 5, 6]], [true, false, true])], [new CodeTest([[-2, -4, 5]], [true, true, false])])
        const codeSolution = "def isNumberEven(input):\n" +
            "\tresult = []\n" +
            "\tfor i in input:\n" +
            "\t\tif(i % 2 > 0):\n" +
            "\t\t\tresult.append(False)\n" +
            "\t\telse:\n" +
            "\t\t\tresult.append(True)\n" +
            "\treturn result"

        const pythonCodeEvaluator: PythonEvaluator = new PythonEvaluator(codeSolution, methodStub, testSuite)
        await pythonCodeEvaluator.runAllTests()
        const testResults = pythonCodeEvaluator.getTestResults()
        testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
    });

    test('string array output parameter (isOddEven function)', async () => {

        const methodStub = new MethodStub("isOddEven", [Tmp.intArrayParam], CodeTypes.stringArrayType)
        const testSuite = new CodeTestSuite([new CodeTest([[1, 2, 3]], ['odd', 'even', 'odd']), new CodeTest([[4, 5, 6]], ['even', 'odd', 'even'])], [new CodeTest([[-2, -4, 5]], ['even', 'even', 'odd'])])
        const codeSolution = "def isNumberEven(input):\n" +
            "\tresult = []\n" +
            "\tfor i in input:\n" +
            "\t\tif(i % 2 > 0):\n" +
            "\t\t\tresult.append('odd')\n" +
            "\t\telse:\n" +
            "\t\t\tresult.append('even')\n" +
            "\treturn result"

        const pythonCodeEvaluator: PythonEvaluator = new PythonEvaluator(codeSolution, methodStub, testSuite)
        await pythonCodeEvaluator.runAllTests()
        const testResults = pythonCodeEvaluator.getTestResults()
        testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
    });

    test('string array output parameter (addToEachNumber function)', async () => {

        const methodStub = new MethodStub("addToEachNumber", [Tmp.intArrayParam, Tmp.intParam], CodeTypes.intArrayType)
        const testSuite = new CodeTestSuite([new CodeTest([[1, 2, 3], 1], [2, 3, 4]), new CodeTest([[4, 5, 6], 0], [4, 5, 6])], [new CodeTest([[-2, -4, 5], -2], [-4, -6, 3])])
        const codeSolution = "def addToEachNumber(input, x):\n" +
            "\tresult = []\n" +
            "\tfor i in input:\n" +
            "\t\tresult.append(i+x)\n" +
            "\treturn result"

        const pythonCodeEvaluator: PythonEvaluator = new PythonEvaluator(codeSolution, methodStub, testSuite)
        await pythonCodeEvaluator.runAllTests()
        const testResults = pythonCodeEvaluator.getTestResults()
        testResults.forEach(testResult => expect(testResult.testPassed).toBeTruthy())
    });

    //TODO add tests where the testPassed is false

});