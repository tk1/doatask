import { FunctionCallBuilder } from "./function-call-builder";
import { MethodStub } from "../method-stub";

export class JavaScriptFunctionCallBuilder implements FunctionCallBuilder {

    public buildFunctionCall(methodStub: MethodStub, testParameter: Array<any>): string {
        // TODO implement for arrays, string booleans etc.
        return methodStub.functionName + "(" + testParameter.join(",") + ")"
    }
}