import { CodeTestResults } from "../code-tests/code-test-results";
import { CodeTestSuite } from "../code-tests/code-test-suite";
import { MethodStub } from "../method-stub";
import { CodeEvaluator } from "./code-evaluator";

export class JavaScriptEvaluator implements CodeEvaluator {

    private code:string
    private methodStub:MethodStub
    private testSuite:CodeTestSuite

    constructor(code:string, methodStub: MethodStub, testSuite:CodeTestSuite) {
        this.code = code
        this.methodStub = methodStub
        this.testSuite = testSuite
     }

    getTestResults(): CodeTestResults {
        return null
    }
    
    runPublicTests() {
        console.log("running public tests")
        console.log(eval(this.code + " " + this.methodStub.functionName + "(" + this.testSuite.publicTests[0].testParameter + ")"));
        console.log("Expected:" + this.testSuite.publicTests[0].expectedOutput)
    }
    runSecrectTests() {
        throw new Error("Method not implemented.")
    }
}