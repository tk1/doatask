import { CodeTypes } from "../../code-types";

export class PythonStringToTypeJavaScriptTransformer {

    public transform(stringToTransform: string, typeOfInput: string): any {
        
        let result: any = null
        
        switch (typeOfInput) {
            case CodeTypes.intType:
                break;
            case CodeTypes.stringType:
                break;
            case CodeTypes.booleanType:
                break;
            case CodeTypes.intArrayType:
                break;
            case CodeTypes.booleanArrayType:
                break;
            case CodeTypes.stringArrayType:
                break;
            default:
                new Error('Unrecognized type ' + typeOfInput)
        }

        return result
    }
}