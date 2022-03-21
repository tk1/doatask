import axios from "axios"
import { CodeRunnerReturn } from "./code-evaluator/code-runner-return"

export class CodeRunnerCaller {

    private codeRunnerPort: number

    constructor(codeRunnerPort: number) {
        this.codeRunnerPort = codeRunnerPort
    }

    public async callCodeRunner(testCall: string, testFunction: string): Promise<CodeRunnerReturn> {
        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append("functionDefinition", testFunction)
        urlSearchParams.append("functionCall", testCall)

        const instance = axios.create({
            baseURL: 'http://host.docker.internal:' + this.codeRunnerPort,
            timeout: 6000,
            headers: { 'Content-Type': 'text/html; charset=UTF-8' },
        })

        let codeEvaluatorReturn = new CodeRunnerReturn()
        try {
            const response = await instance.post('runCode?' + urlSearchParams.toString())
            Object.assign(codeEvaluatorReturn, response.data)
        } catch (error) {
            codeEvaluatorReturn.errorOutput = 'Internal error, could not run code'
            codeEvaluatorReturn.returnValue = undefined
        }
        return codeEvaluatorReturn
    }
}