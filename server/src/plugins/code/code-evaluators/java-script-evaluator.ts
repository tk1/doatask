import { CodeTestResults } from "../code-tests/code-test-results";
import { CodeTestSuite } from "../code-tests/code-test-suite";
import { MethodStub } from "../method-stub";
import { CodeEvaluator } from "./code-evaluator";

export class JavaScriptEvaluator implements CodeEvaluator {
    constructor(code:string, methodStub: MethodStub, testSuite:CodeTestSuite) { }

    getTestResults(): CodeTestResults {
        throw new Error("Method not implemented.")
    }
    
    runPublicTests() {
        throw new Error("Method not implemented.")
    }
    runSecrectTests() {
        throw new Error("Method not implemented.")
    }
}