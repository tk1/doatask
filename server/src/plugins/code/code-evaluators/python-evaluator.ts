import { CodeTestResult } from "../code-tests/code-test-result";
import { CodeTestSuite } from "../code-tests/code-test-suite";
import { MethodStub } from "../method-stub";
import { AbstractCodeEvaluator } from "./abstract-code-evaluator";

export class PythonEvaluator extends AbstractCodeEvaluator {
    constructor(code:string, methodStub: MethodStub, testSuite:CodeTestSuite) {
        super();
    }
    
    getTestResults(): CodeTestResult[] {
        throw new Error("Method not implemented.");
    }
    
    runPublicTests() {
        throw new Error("Method not implemented.");
    }
    runSecretTests() {
        throw new Error("Method not implemented.");
    }
}