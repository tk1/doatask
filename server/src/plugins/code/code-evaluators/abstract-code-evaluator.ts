import { CodeTest } from "../code-tests/code-test";
import { CodeTestResult } from "../code-tests/code-test-result";
import { CodeTestSuite } from "../code-tests/code-test-suite";
import { CodeEvaluator } from "./code-evaluator";
import { CodeEvaluatorReturn } from "./code-evaluator-return";

export abstract class AbstractCodeEvaluator implements CodeEvaluator {

    protected codeTestResults: CodeTestResult[]
    protected testSuite: CodeTestSuite

    abstract runTests(codeTests: CodeTest[], isPublicTest: boolean): Promise<void>

    constructor(testSuite: CodeTestSuite) {
        this.codeTestResults = new Array<CodeTestResult>()
        this.testSuite = testSuite
    }

    getTestResults(): CodeTestResult[] {
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

    protected checkTestOutput(expectedOutput: any, output: any): boolean {

        /*console.log(expectedOutput + "-" + output)
        console.log(typeof(expectedOutput) + "-" + typeof(output))
        console.log(expectedOutput === output)*/

        if (Array.isArray(expectedOutput) && Array.isArray(output)) {
            for (let i = 0; i < expectedOutput.length; i++) {
                if (output.length < i) {
                    return false;
                } else {
                    if (expectedOutput[i] !== output[i]) {
                        return false;
                    }
                }
            }
            return true;
        }
        return expectedOutput === output
    }

    // TODO use this as the checkTestOutput function in the abstract code evaluator
    protected checkTestOutput2(expectedOutput: any, output: CodeEvaluatorReturn): boolean {
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