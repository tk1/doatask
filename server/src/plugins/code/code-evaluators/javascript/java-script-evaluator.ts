import { CodeTest } from "../../code-tests/code-test";
import { CodeTestResult } from "../../code-tests/code-test-result";
import { CodeTestSuite } from "../../code-tests/code-test-suite";
import { MethodStub } from "../../method-stub";
import { AbstractCodeEvaluator } from "../abstract-code-evaluator";

export class JavaScriptEvaluator extends AbstractCodeEvaluator {

    private code:string
    private methodStub:MethodStub
    private testSuite:CodeTestSuite
    private codeTestResults: CodeTestResult[]

    constructor(code:string, methodStub: MethodStub, testSuite:CodeTestSuite) {
        super();
        this.code = code
        this.methodStub = methodStub
        this.testSuite = testSuite
        this.codeTestResults = new Array<CodeTestResult>()
     }

    getTestResults(): CodeTestResult[] {
        return this.codeTestResults
    }
    
    runPublicTests() {
        this.runTests(this.testSuite.publicTests, true)
    }
    
    runSecretTests() {
        this.runTests(this.testSuite.secretTests, false)
    }

    runTests(codeTests: CodeTest[], isPublicTest: boolean) {
        for(let test of codeTests) {
            // TODO switch the eval for a more secure option (e.g. vm2)
            const output = eval(this.buildTestCall(test))
            const testPassed = this.checkTestOutput(test.expectedOutput, output);
            const codeTestResult = new CodeTestResult(test.testParameter, test.expectedOutput, output, testPassed, isPublicTest)
            this.codeTestResults.push(codeTestResult)
        }
    }

    private buildTestCall(test:CodeTest): string {
        //console.log(this.code + " " + this.methodStub.functionName + "(" + test.testParameter.join(",") + ")")
        return this.code + " " + this.methodStub.functionName + "(" + test.testParameter.join(",") + ")"
    }
}