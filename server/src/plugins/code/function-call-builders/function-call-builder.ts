import { MethodStub } from "../method-stub";

export interface FunctionCallBuilder {
    buildFunctionCall(methodStub: MethodStub, testParameter: Array<any>): string
}