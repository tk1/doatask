import axios from "axios";
import { CodeTest } from "../../code-tests/code-test";
import { CodeTestResult } from "../../code-tests/code-test-result";
import { CodeTestSuite } from "../../code-tests/code-test-suite";
import { MethodStub } from "../../method-stub";
import { AbstractCodeEvaluator } from "../abstract-code-evaluator";

export class JavaEvaluator extends AbstractCodeEvaluator {

    private code:string
    private methodStub:MethodStub
    
    constructor(code:string, methodStub: MethodStub, testSuite:CodeTestSuite) {
        super(testSuite);
        this.code = code
        this.methodStub = methodStub
     }

    async runTests(codeTests: CodeTest[], isPublicTest: boolean) {
        for(let test of codeTests) {
            const testCall = this.buildTestCallWithoutFunctionDefinition(test)
            const output = this.callJavaCodeRunner(testCall)
            const testPassed = this.checkTestOutput(test.expectedOutput, output)
            const codeTestResult = new CodeTestResult(test.testParameter, test.expectedOutput, output, testPassed, isPublicTest)
            this.codeTestResults.push(codeTestResult)
        }
    }

    private buildTestCallWithoutFunctionDefinition(test:CodeTest): string {
        //console.log(this.code + " " + this.methodStub.functionName + "(" + test.testParameter.join(",") + ")")
        return this.methodStub.functionName + "(" + test.testParameter.join(",") + ");"
    }

    private async callJavaCodeRunner(testCall:string):Promise<string> {
        
        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append("functionDefinition", this.code)
        urlSearchParams.append("functionCall", testCall)

        const instance = axios.create({
            baseURL: 'http://localhost:8082',
            timeout: 1000,
            headers: { 'Content-Type': 'text/html; charset=UTF-8' },
        })
        const response = await instance.post('runCode?' + urlSearchParams.toString())
        return response.data
    }
}