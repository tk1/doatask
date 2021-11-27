import { MethodStub } from "../method-stub";
import { FunctionCallBuilder } from "./function-call-builder";

export class JavaFunctionCallBuilder implements FunctionCallBuilder {

    buildFunctionCall(methodStub: MethodStub, testParameter: Array<any>): string {
        return methodStub.functionName + "(" + testParameter.join(",") + ");"
    }
}