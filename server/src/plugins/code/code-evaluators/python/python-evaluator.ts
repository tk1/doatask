import { CodeTest } from "../../code-tests/code-test";
import { CodeTestResult } from "../../code-tests/code-test-result";
import { CodeTestSuite } from "../../code-tests/code-test-suite";
import { MethodStub } from "../../method-stub";
import { AbstractCodeEvaluator } from "../abstract-code-evaluator";
import axios, { AxiosResponse } from 'axios'

export class PythonEvaluator extends AbstractCodeEvaluator {

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
    
    private async runTests(codeTests: CodeTest[], isPublicTest: boolean) {
        for(let test of codeTests) {
            const testCall = this.buildTestCallWithoutFunctionDefinition(test)
            await this.callPythonCodeRunner(testCall).then(output => {
                const testPassed = this.checkTestOutput(test.expectedOutput, output);
                const codeTestResult = new CodeTestResult(test.testParameter, test.expectedOutput, output, testPassed, isPublicTest)
                this.codeTestResults.push(codeTestResult)
            })     
        }
    }

    private buildTestCallWithoutFunctionDefinition(test: CodeTest):string {
        return this.methodStub.functionName + "(" + test.testParameter.join(",") + ")"
    }

    private callPythonCodeRunner(testCall:string):any {
        
        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append("functionDefinition", this.code)
        urlSearchParams.append("functionCall", testCall)

          const instance = axios.create({
            baseURL: 'http://localhost:8081',
            timeout: 1000,
            headers: { 'Content-Type': 'text/html; charset=UTF-8' },
          })

          const response = instance.post('runCode?' + urlSearchParams.toString())
          return response
    }
}