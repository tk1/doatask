import { CodeTestResult } from "../code-tests/code-test-result";

export interface CodeEvaluator {
    runPublicTests(): void
    runSecretTests(): void
    runAllTests(): void
    getTestResults(): CodeTestResult[]
}