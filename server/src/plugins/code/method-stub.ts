import { MethodParameter } from "./method-parameter";

export class MethodStub {

    readonly functionName: string
    readonly parameter: Array<MethodParameter>
    returnType: string

    constructor(functionName: string, parameter: Array<MethodParameter>, returnType: string) {
        this.functionName = functionName
        this.parameter = parameter
        this.returnType = returnType
     }
}