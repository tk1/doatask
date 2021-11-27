import { CodeTestSuite } from "./code-tests/code-test-suite"
import { MethodStub } from "./method-stub"

export class CodeDto {
    language: string
    methodStub: MethodStub
    testSuite: CodeTestSuite
}