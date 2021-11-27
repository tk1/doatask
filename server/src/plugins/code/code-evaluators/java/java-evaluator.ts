import axios from "axios";
import { CodeRunnerCaller } from "../../code-runner-caller";
import { CodeTest } from "../../code-tests/code-test";
import { CodeTestResult } from "../../code-tests/code-test-result";
import { CodeTestSuite } from "../../code-tests/code-test-suite";
import { FunctionCallBuilder } from "../../function-call-builders/function-call-builder";
import { JavaFunctionCallBuilder } from "../../function-call-builders/java-function-call-builder";
import { MethodStub } from "../../method-stub";
import { AbstractCodeEvaluator } from "../abstract-code-evaluator";

export class JavaEvaluator extends AbstractCodeEvaluator {

    private code: string
    private methodStub: MethodStub
    private codeRunnerCaller: CodeRunnerCaller
    private javaFunctionCallBuilder: FunctionCallBuilder

    constructor(code: string, methodStub: MethodStub, testSuite: CodeTestSuite) {
        super(testSuite);
        this.code = code
        this.methodStub = methodStub
        this.codeRunnerCaller = new CodeRunnerCaller(10002)
        this.javaFunctionCallBuilder = new JavaFunctionCallBuilder()
    }

    async runTests(codeTests: CodeTest[], isPublicTest: boolean) {
        for (let test of codeTests) {
            const testCall = this.javaFunctionCallBuilder.buildFunctionCall(this.methodStub, test.testParameter)
            const output = await this.codeRunnerCaller.callCodeRunner(testCall, this.code)
            const testPassed = this.checkTestOutput(test.expectedOutput, output)
            const codeTestResult = new CodeTestResult(test.testParameter, test.expectedOutput, output.returnValue, testPassed, isPublicTest)
            this.codeTestResults.push(codeTestResult)
        }
    }
}