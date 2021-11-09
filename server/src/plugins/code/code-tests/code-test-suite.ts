import { CodeTest } from "./code-test";

export class CodeTestSuite {

    readonly publicTests: Array<CodeTest>
    readonly privateTests: Array<CodeTest>

    constructor(publicTests: Array<CodeTest>, privateTests: Array<CodeTest>) { 
        this.publicTests = publicTests
        this.privateTests = privateTests
    }
}