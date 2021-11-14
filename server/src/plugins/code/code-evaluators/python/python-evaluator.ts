import { CodeTest } from "../../code-tests/code-test";
import { CodeTestResult } from "../../code-tests/code-test-result";
import { CodeTestSuite } from "../../code-tests/code-test-suite";
import { MethodStub } from "../../method-stub";
import { AbstractCodeEvaluator } from "../abstract-code-evaluator";
import axios from 'axios'

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
        this.runTests(this.testSuite.publicTests, false)
    }

    runSecretTests() {
        this.runTests(this.testSuite.secretTests, true)
    }
    
    private runTests(codeTests: CodeTest[], isPublicTest: boolean) {
        for(let test of codeTests) {
            const testCall = this.buildTestCallWithoutFunctionDefinition(test)
            const output = this.callPythonCodeRunner(testCall)
            const testPassed = this.checkTestOutput(test.expectedOutput, output);
            const codeTestResult = new CodeTestResult(test.testParameter, test.expectedOutput, output, testPassed, isPublicTest)
            this.codeTestResults.push(codeTestResult)
        }
    }

    private buildTestCallWithoutFunctionDefinition(test: CodeTest):string {
        return this.methodStub.functionName + "(" + test.testParameter.join(",") + ")" 
    }

    private callPythonCodeRunner(testCall:string, ): string {    
        
        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append("functionDefinition", this.code)
        urlSearchParams.append("functionCall", testCall)

        axios({
            method: 'post',
            url: 'http://localhost/runCode?' + urlSearchParams.toString(),
            headers: { 'Content-Type': 'text/html; charset=UTF-8' },
          });








/*
        var codeRunnerReturn:string = ''

        

        const options = {
            hostname: 'localhost',
            port: 8081,
            path: '/runCode?' + urlSearchParams.toString(),
            method: 'POST',
            headers: {
              'Content-Type': 'text/html; charset=UTF-8',
              'Content-Length': 0
            }
          }

          let callback = function(response: http.IncomingMessage) {
            let responseData:string = ''
    
                response.on('data', (chunk) => {
                    responseData += chunk.toString()
                })
    
                response.on('end', () => {
                    console.log('Response.on(end)')
                    codeRunnerReturn = responseData
                })
        }

        http.request(options, callback).end()*/
        return 'test'
    }
}