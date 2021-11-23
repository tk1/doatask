import { CodeTest } from "../code-tests/code-test";
import { CodeTestResult } from "../code-tests/code-test-result";
import { CodeTestSuite } from "../code-tests/code-test-suite";
import { CodeEvaluator } from "./code-evaluator";

export abstract class AbstractCodeEvaluator implements CodeEvaluator {
    
    protected codeTestResults: CodeTestResult[] 
    protected testSuite:CodeTestSuite

    abstract runTests(codeTests: CodeTest[], isPublicTest: boolean): Promise<void>

    constructor(testSuite:CodeTestSuite){
        this.codeTestResults = new Array<CodeTestResult>()
        this.testSuite = testSuite
    }

    getTestResults(): CodeTestResult[] {
        return this.codeTestResults
    }
    
    async runAllTests():Promise<void> {
        await this.runPublicTests()
        await this.runSecretTests()
    }

    async runPublicTests(): Promise<void> {
        await this.runTests(this.testSuite.publicTests, true)
    }

    async runSecretTests(): Promise<void> {
        await this.runTests(this.testSuite.secretTests, false)
    }

    protected checkTestOutput(expectedOutput: any, output: any) : boolean {
        return expectedOutput === output
    }
}