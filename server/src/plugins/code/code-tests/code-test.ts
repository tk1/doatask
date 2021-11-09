export class CodeTest {

    readonly testParameter: Array<string>
    readonly expectedOutput: string

    constructor(testParameter: Array<string>, expectedOutput: string) {
        this.testParameter = testParameter
        this.expectedOutput = expectedOutput
     }
}