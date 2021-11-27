import axios from "axios"
import { CodeEvaluatorReturn } from "./code-evaluators/code-evaluator-return"

export class CodeRunnerCaller {
    public async callCodeRunner(testCall: string, testFunction: string): Promise<CodeEvaluatorReturn> {

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append("functionDefinition", testFunction)
        urlSearchParams.append("functionCall", testCall)

        const instance = axios.create({
            baseURL: 'http://localhost:8081',
            timeout: 1000,
            headers: { 'Content-Type': 'text/html; charset=UTF-8' },
        })
        const response = await instance.post('runCode?' + urlSearchParams.toString())

        let codeEvaluatorReturn = new CodeEvaluatorReturn()
        Object.assign(codeEvaluatorReturn, response.data)
        //console.log(codeEvaluatorReturn)
        return codeEvaluatorReturn
    }
}