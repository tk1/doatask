import { CodeTestResult } from "../code-tests/code-test-result";

export interface CodeEvaluator {
    runPublicTests(): Promise<void>
    runSecretTests(): Promise<void>
    runAllTests(): Promise<void>
    getTestResults(): CodeTestResult[]
}