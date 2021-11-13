import { CodeTestResult } from "../code-tests/code-test-result";
import { CodeEvaluator } from "./code-evaluator";

export abstract class AbstractCodeEvaluator implements CodeEvaluator{
    abstract runPublicTests(): void
    abstract runSecretTests(): void
    abstract getTestResults(): CodeTestResult[]
    
    runAllTests(): void {
        this.runPublicTests()
        this.runSecretTests()
    }
}