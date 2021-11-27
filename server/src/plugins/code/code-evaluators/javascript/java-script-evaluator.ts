import { CodeRunnerCaller } from "../../code-runner-caller";
import { CodeTest } from "../../code-tests/code-test";
import { CodeTestResult } from "../../code-tests/code-test-result";
import { CodeTestSuite } from "../../code-tests/code-test-suite";
import { FunctionCallBuilder } from "../../function-call-builders/function-call-builder";
import { MethodStub } from "../../method-stub";
import { AbstractCodeEvaluator } from "../abstract-code-evaluator";
import { JavaScriptFunctionCallBuilder } from "../../function-call-builders/java-script-function-call-builder";

export class JavaScriptEvaluator extends AbstractCodeEvaluator {

    private code: string
    private methodStub: MethodStub
    private codeRunnerCaller: CodeRunnerCaller
    private javaScriptFunctionCallBuilder: FunctionCallBuilder

    constructor(code: string, methodStub: MethodStub, testSuite: CodeTestSuite) {
        super(testSuite);
        this.code = code
        this.methodStub = methodStub
        this.codeRunnerCaller = new CodeRunnerCaller(10000)
        this.javaScriptFunctionCallBuilder = new JavaScriptFunctionCallBuilder()
    }

    async runTests(codeTests: CodeTest[], isPublicTest: boolean) {
        for (let test of codeTests) {
            // TODO switch the eval for a more secure option (e.g. vm2)
            const output = await this.codeRunnerCaller.callCodeRunner(this.javaScriptFunctionCallBuilder.buildFunctionCall(this.methodStub, test.testParameter), this.code)
            const testPassed = this.checkTestOutput(test.expectedOutput, output)
            const codeTestResult = new CodeTestResult(test.testParameter, test.expectedOutput, output.returnValue, testPassed, isPublicTest)
            this.codeTestResults.push(codeTestResult)
        }
    }
}