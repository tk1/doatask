import { CodeTest } from "../../code-tests/code-test";
import { CodeTestResult } from "../../code-tests/code-test-result";
import { CodeTestSuite } from "../../code-tests/code-test-suite";
import { MethodStub } from "../../method-stub";
import { AbstractCodeEvaluator } from "../abstract-code-evaluator";

export class JavaScriptEvaluator extends AbstractCodeEvaluator {

    private code:string
    private methodStub:MethodStub
    
    constructor(code:string, methodStub: MethodStub, testSuite:CodeTestSuite) {
        super(testSuite);
        this.code = code
        this.methodStub = methodStub
     }

    async runTests(codeTests: CodeTest[], isPublicTest: boolean) {
        for(let test of codeTests) {
            // TODO switch the eval for a more secure option (e.g. vm2)
            const output = eval(this.buildTestCall(test))
            const testPassed = this.checkTestOutput(test.expectedOutput, output)
            const codeTestResult = new CodeTestResult(test.testParameter, test.expectedOutput, output, testPassed, isPublicTest)
            this.codeTestResults.push(codeTestResult)
        }
    }

    private buildTestCall(test:CodeTest): string {
        //console.log(this.code + " " + this.methodStub.functionName + "(" + test.testParameter.join(",") + ")")
        return this.code + " " + this.methodStub.functionName + "(" + test.testParameter.join(",") + ")"
    }
}