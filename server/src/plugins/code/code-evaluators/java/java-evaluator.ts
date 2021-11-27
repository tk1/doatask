import axios from "axios";
import { CodeRunnerCaller } from "../../code-runner-caller";
import { CodeTest } from "../../code-tests/code-test";
import { CodeTestResult } from "../../code-tests/code-test-result";
import { CodeTestSuite } from "../../code-tests/code-test-suite";
import { MethodStub } from "../../method-stub";
import { AbstractCodeEvaluator } from "../abstract-code-evaluator";

export class JavaEvaluator extends AbstractCodeEvaluator {

    private code: string
    private methodStub: MethodStub
    private codeRunnerCaller: CodeRunnerCaller

    constructor(code: string, methodStub: MethodStub, testSuite: CodeTestSuite) {
        super(testSuite);
        this.code = code
        this.methodStub = methodStub
        this.codeRunnerCaller = new CodeRunnerCaller()
    }

    async runTests(codeTests: CodeTest[], isPublicTest: boolean) {
        for (let test of codeTests) {
            const testCall = this.buildTestCallWithoutFunctionDefinition(test)
            const output = await this.codeRunnerCaller.callCodeRunner(testCall, this.code)
            const testPassed = this.checkTestOutput2(test.expectedOutput, output)
            const codeTestResult = new CodeTestResult(test.testParameter, test.expectedOutput, output, testPassed, isPublicTest)
            this.codeTestResults.push(codeTestResult)
        }
    }

    private buildTestCallWithoutFunctionDefinition(test: CodeTest): string {
        //console.log(this.code + " " + this.methodStub.functionName + "(" + test.testParameter.join(",") + ")")
        return this.methodStub.functionName + "(" + test.testParameter.join(",") + ");"
    }
}