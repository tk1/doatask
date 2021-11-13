export class CodeTestResult {

    readonly testParameter: string[]
    readonly expectedOutput: string
    readonly output: any
    readonly testPassed: boolean
    readonly isPublicTest: boolean

    constructor(testParameter: string[], expectedOutput: string, output:any, testPassed:boolean, isPublicTest:boolean) {
        this.testParameter = testParameter
        this.expectedOutput = expectedOutput
        this.output = output
        this.testPassed = testPassed
        this.isPublicTest = isPublicTest
    }
}