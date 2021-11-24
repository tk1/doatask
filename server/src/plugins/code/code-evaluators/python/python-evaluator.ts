import { CodeTest } from "../../code-tests/code-test";
import { CodeTestResult } from "../../code-tests/code-test-result";
import { CodeTestSuite } from "../../code-tests/code-test-suite";
import { MethodStub } from "../../method-stub";
import { AbstractCodeEvaluator } from "../abstract-code-evaluator";
import axios from 'axios'
import { PythonFunctionCallBuilder } from "./python-function-call-builder";
import { PythonStringToTypeJavaScriptTransformer } from "./python-string-to-js-transformer";

export class PythonEvaluator extends AbstractCodeEvaluator {

    private code: string
    private methodStub: MethodStub
    private pythonFunctionCallBuilder: PythonFunctionCallBuilder
    private pythonTypeTransformer: PythonStringToTypeJavaScriptTransformer

    constructor(code: string, methodStub: MethodStub, testSuite: CodeTestSuite) {
        super(testSuite);
        this.code = code
        this.methodStub = methodStub
        this.pythonFunctionCallBuilder = new PythonFunctionCallBuilder()
        this.pythonTypeTransformer = new PythonStringToTypeJavaScriptTransformer()
    }

    async runTests(codeTests: CodeTest[], isPublicTest: boolean) {
        for (let test of codeTests) {
            const testCall = this.pythonFunctionCallBuilder.buildFunctionCall(this.methodStub, test.testParameter)
            const output = await this.callPythonCodeRunner(testCall)
            const transformedOutput: any = this.pythonTypeTransformer.transform(output, this.methodStub.returnType)
            const testPassed = this.checkTestOutput(test.expectedOutput, transformedOutput)
            const codeTestResult = new CodeTestResult(test.testParameter, test.expectedOutput, transformedOutput, testPassed, isPublicTest)
            this.codeTestResults.push(codeTestResult)
        }
    }

    private async callPythonCodeRunner(testCall: string): Promise<string> {

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append("functionDefinition", this.code)
        urlSearchParams.append("functionCall", testCall)

        const instance = axios.create({
            baseURL: 'http://localhost:8081',
            timeout: 1000,
            headers: { 'Content-Type': 'text/html; charset=UTF-8' },
        })
        const response = await instance.post('runCode?' + urlSearchParams.toString())
        return response.data.toString()
    }
}