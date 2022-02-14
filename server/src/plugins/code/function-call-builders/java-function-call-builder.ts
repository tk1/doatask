import { CodeTypes } from "../code-types";
import { MethodStub } from "../method-stub";
import { FunctionCallBuilder } from "./function-call-builder";
import { FunctionCallBuilderUtil } from "./function-call-builder-util";

export class JavaFunctionCallBuilder implements FunctionCallBuilder {

    private fcbu: FunctionCallBuilderUtil

    constructor() {
        this.fcbu = new FunctionCallBuilderUtil()
    }

    public buildFunctionCall(methodStub: MethodStub, testParameter: Array<any>): string {
        let testParameters: string = ""

        for (let i = 0; i < testParameter.length; i++) {

            testParameters += testParameters === "" ? "" : ", "

            switch (methodStub.parameter[i].type) {
                case CodeTypes.intType:
                    testParameters += this.fcbu.buildIntTypeParameter(testParameter[i])
                    break;
                case CodeTypes.stringType:
                    testParameters += this.fcbu.buildStringTypeParameterWithDoubleQuotes(testParameter[i])
                    break;
                case CodeTypes.booleanType:
                    testParameters += this.fcbu.buildBooleanTypeParameterLowerCase(testParameter[i])
                    break;
                case CodeTypes.intArrayType:
                    testParameters += this.fcbu.buildArrayTypeParameter(testParameter[i], this.fcbu.buildIntTypeParameter)
                    break;
                case CodeTypes.booleanArrayType:
                    testParameters += this.fcbu.buildArrayTypeParameter(testParameter[i], this.fcbu.buildBooleanTypeParameterLowerCase)
                    break;
                case CodeTypes.stringArrayType:
                    testParameters += this.fcbu.buildArrayTypeParameter(testParameter[i], this.fcbu.buildStringTypeParameterWithDoubleQuotes)
                    break;
                default:
                    new Error('Unrecognized type ' + methodStub.parameter[i].type)
            }
        }

        return methodStub.functionName + "(" + testParameters + ");"
    }
}