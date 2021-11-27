import { CodeRunnerCaller } from "../code-runner-caller";
import { CodeTest } from "../code-tests/code-test";
import { CodeTestResult } from "../code-tests/code-test-result";
import { CodeTestSuite } from "../code-tests/code-test-suite";
import { CodeDto } from "../code.dto";
import { FunctionCallBuilder } from "../function-call-builders/function-call-builder";
import { FunctionCallBuilderFactory } from "../function-call-builders/function-call-builder.factory";
import { MethodStub } from "../method-stub";
import { CodeEvaluatorReturn } from "./code-evaluator-return";

export class CodeEvaluator {

    protected codeTestResults: CodeTestResult[]
    protected testSuite: CodeTestSuite
    private codeRunnerCaller: CodeRunnerCaller
    private functionCallBuilder: FunctionCallBuilder
    private code: string
    private methodStub: MethodStub
    private language: string

    constructor(code: string, codeDto: CodeDto) {
        this.language = codeDto.language
        this.code = code
        this.methodStub = codeDto.methodStub
        this.codeTestResults = new Array<CodeTestResult>()
        this.testSuite = codeDto.testSuite
        this.functionCallBuilder = FunctionCallBuilderFactory.createFunctionCallBuilder(codeDto.language)

        // TODO CodeRunnerCaller, der Punkt hier muss verbessert werden
        switch (codeDto.language.trim().toLowerCase()) {
            case 'javascript':
                this.codeRunnerCaller = new CodeRunnerCaller(10000)
                break;
            case 'python':
                this.codeRunnerCaller = new CodeRunnerCaller(10001)
                break;
            case 'java':
                this.codeRunnerCaller = new CodeRunnerCaller(10002)
                break;
            default:
                throw new Error('Language ' + codeDto.language + ' not supported')
        }
    }

    public async runTests(codeTests: CodeTest[], isPublicTest: boolean) {
        for (let test of codeTests) {
            const testCall = this.functionCallBuilder.buildFunctionCall(this.methodStub, test.testParameter)
            const output = await this.codeRunnerCaller.callCodeRunner(testCall, this.code)
            const testPassed = this.checkTestOutput(test.expectedOutput, output)
            const codeTestResult = new CodeTestResult(test.testParameter, test.expectedOutput, output.returnValue, testPassed, isPublicTest)
            this.codeTestResults.push(codeTestResult)
        }
    }

    public getTestResults(): CodeTestResult[] {
        return this.codeTestResults
    }

    async runAllTests(): Promise<void> {
        await this.runPublicTests()
        await this.runSecretTests()
    }

    async runPublicTests(): Promise<void> {
        await this.runTests(this.testSuite.publicTests, true)
    }

    async runSecretTests(): Promise<void> {
        await this.runTests(this.testSuite.secretTests, false)
    }

    private checkTestOutput(expectedOutput: any, output: CodeEvaluatorReturn): boolean {
        /*console.log(expectedOutput + "-" + output)
        console.log(typeof(expectedOutput) + "-" + typeof(output))
        console.log(expectedOutput === output)*/

        if (Array.isArray(expectedOutput) && Array.isArray(output.returnValue)) {
            return this.checkTestArrayOutput(expectedOutput, output.returnValue)
        }
        return expectedOutput === output.returnValue
    }

    private checkTestArrayOutput(expectedOutput: Array<any>, output: Array<any>): boolean {

        if (this.arraysHaveSameLength(expectedOutput, output)) {
            for (let i = 0; i < expectedOutput.length; i++) {
                if (expectedOutput[i] !== output[i]) {
                    return false
                }
            }
            return true
        }
        return false
    }

    private arraysHaveSameLength(array1: any[], array2: any[]): boolean {
        return array1.length === array2.length
    }
}