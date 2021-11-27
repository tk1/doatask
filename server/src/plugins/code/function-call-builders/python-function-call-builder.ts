import { CodeTypes } from "../code-types";
import { FunctionCallBuilder } from "./function-call-builder";
import { MethodStub } from "../method-stub";

export class PythonFunctionCallBuilder implements FunctionCallBuilder {

    public buildFunctionCall(methodStub: MethodStub, testParameter: Array<any>): string {

        let testParameters: string = ''
        for (let i = 0; i < testParameter.length; i++) {

            testParameters += testParameters === '' ? '' : ', '

            switch (methodStub.parameter[i].type) {
                case CodeTypes.intType:
                    testParameters += this.buildIntTypeParameter(testParameter[i])
                    break;
                case CodeTypes.stringType:
                    testParameters += this.buildStringTypeParameter(testParameter[i])
                    break;
                case CodeTypes.booleanType:
                    testParameters += this.buildBooleanTypeParameter(testParameter[i])
                    break;
                case CodeTypes.intArrayType:
                    testParameters += this.buildIntArrayTypeParameter(testParameter[i])
                    break;
                case CodeTypes.booleanArrayType:
                    testParameters += this.buildBooleanArrayTypeParameter(testParameter[i])
                    break;
                case CodeTypes.stringArrayType:
                    testParameters += this.buildStringArrayTypeParameter(testParameter[i])
                    break;
                default:
                    new Error('Unrecognized type ' + methodStub.parameter[i].type)
            }
        }

        return methodStub.functionName + "(" + testParameters + ")"
    }

    private buildIntTypeParameter(intParameter: number): string {
        return intParameter.toString();
    }

    private buildStringTypeParameter(stringParameter: string): string {
        return "'" + stringParameter + "'";
    }

    private buildBooleanTypeParameter(booleanParameter: boolean): string {
        return booleanParameter ? 'True' : 'False';
    }

    private buildIntArrayTypeParameter(intArrayParameter: Array<number>): string {

        let result: string = undefined

        for (let currentNumberInArray of intArrayParameter) {
            if (result === undefined) {
                result = '' + currentNumberInArray
            } else {
                result += ', ' + currentNumberInArray
            }
        }

        return '[' + result + ']'
    }

    private buildStringArrayTypeParameter(stringArrayParameter: Array<string>): string {

        let result: string = undefined

        for (let currentStringInArray of stringArrayParameter) {
            if (result === undefined) {
                result = this.buildStringTypeParameter(currentStringInArray)
            } else {
                result += ', ' + this.buildStringTypeParameter(currentStringInArray)
            }
        }

        return '[' + result + ']'
    }

    private buildBooleanArrayTypeParameter(booleanArrayParameter: Array<boolean>): string {
        let result: string = undefined

        for (let currentBooleanInArray of booleanArrayParameter) {
            if (result === undefined) {
                result = this.buildBooleanTypeParameter(currentBooleanInArray)
            } else {
                result += ', ' + this.buildBooleanTypeParameter(currentBooleanInArray)
            }
        }

        return '[' + result + ']'
    }
}