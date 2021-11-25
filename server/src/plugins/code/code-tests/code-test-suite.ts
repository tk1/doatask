import { CodeTest } from "./code-test";

export class CodeTestSuite {

    readonly publicTests: Array<CodeTest>
    readonly secretTests: Array<CodeTest>

    constructor(publicTests: Array<CodeTest>, secretTests: Array<CodeTest>) { 
        this.publicTests = publicTests
        this.secretTests = secretTests
    }
}