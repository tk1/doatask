import { CodeTest } from "../../code-tests/code-test";
import { CodeTestResult } from "../../code-tests/code-test-result";
import { CodeTestSuite } from "../../code-tests/code-test-suite";
import { MethodStub } from "../../method-stub";
import { AbstractCodeEvaluator } from "../abstract-code-evaluator";
import { PythonFunctionCallBuilder } from "../../function-call-builders/python-function-call-builder";
import { CodeRunnerCaller } from "../../code-runner-caller";
import { FunctionCallBuilder } from "../../function-call-builders/function-call-builder";

export class PythonEvaluator extends AbstractCodeEvaluator {

    private code: string
    private methodStub: MethodStub
    private pythonFunctionCallBuilder: FunctionCallBuilder
    private codeRunnerCaller: CodeRunnerCaller

    constructor(code: string, methodStub: MethodStub, testSuite: CodeTestSuite) {
        super(testSuite);
        this.code = code
        this.methodStub = methodStub
        this.pythonFunctionCallBuilder = new PythonFunctionCallBuilder()
        this.codeRunnerCaller = new CodeRunnerCaller(10001)
    }

    // TODO move the runTests method to the abstract code evaluator
    async runTests(codeTests: CodeTest[], isPublicTest: boolean) {
        for (let test of codeTests) {
            const testCall = this.pythonFunctionCallBuilder.buildFunctionCall(this.methodStub, test.testParameter)
            const output = await this.codeRunnerCaller.callCodeRunner(testCall, this.code)
            const testPassed = this.checkTestOutput(test.expectedOutput, output)
            const codeTestResult = new CodeTestResult(test.testParameter, test.expectedOutput, output.returnValue, testPassed, isPublicTest)
            this.codeTestResults.push(codeTestResult)
        }
    }
}