import { CodeTestSuite } from "./code-tests/code-test-suite"
import { MethodStub } from "./method-stub"

export class CodeDto {

    readonly language: string
    readonly methodStub: MethodStub
    readonly testSuite: CodeTestSuite
}