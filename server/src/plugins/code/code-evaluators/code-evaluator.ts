import { CodeTestResults } from "../code-tests/code-test-results";

export interface CodeEvaluator {
    runPublicTests(): void
    runSecrectTests(): void
    getTestResults(): CodeTestResults
}