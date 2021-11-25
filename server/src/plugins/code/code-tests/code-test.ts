export class CodeTest {

    readonly testParameter: Array<any>
    readonly expectedOutput: any

    constructor(testParameter: Array<any>, expectedOutput: any) {
        this.testParameter = testParameter
        this.expectedOutput = expectedOutput
     }
}