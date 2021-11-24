import { CodeTypes } from "../../code-types";

export class PythonStringToTypeJavaScriptTransformer {

    public transform(stringToTransform: string, typeOfInput: string): any {

        let result: any = null

        switch (typeOfInput) {
            case CodeTypes.intType:
                result = this.transformToInt(stringToTransform)
                break;
            case CodeTypes.stringType:
                result = this.transformToString(stringToTransform)
                break;
            case CodeTypes.booleanType:
                result = this.transformToBoolean(stringToTransform)
                break;
            case CodeTypes.intArrayType:
                result = this.transformToIntArray(stringToTransform)
                break;
            case CodeTypes.booleanArrayType:
                result = this.transformToBooleanArray(stringToTransform)
                break;
            case CodeTypes.stringArrayType:
                result = this.transformToStringArray(stringToTransform)
                break;
            default:
                new Error('Unrecognized type ' + typeOfInput)
        }
        return result
    }

    private transformToInt(stringToTransform: string): number {
        return Number(stringToTransform)
    }

    private transformToString(stringToTransform: string): String {
        return String(stringToTransform)
    }

    private transformToBoolean(stringToTransform: string): boolean {
        if (stringToTransform === 'True') {
            return true;
        } else if (stringToTransform === 'False') {
            return false
        } else {
            new Error('The string ' + stringToTransform + ' cannot be transformed to a boolean')
        }
    }

    private transformToIntArray(stringToTransform: string): Array<number> {
        if (stringToTransform === '') {
            return []
        } else {
            return stringToTransform.split(',').map(Number)
        }
    }

    private transformToStringArray(stringToTransform: string): Array<string> {
        const stringWithoutSquaredBrackets = this.removeSquaredBrackets(stringToTransform)
        if (stringWithoutSquaredBrackets === '') {
            return []
        } else {
            const arrayElements = stringWithoutSquaredBrackets.split(',')
            return arrayElements.map(x => x.trim().replace("'", "").replace("'", ""))
        }
    }

    private transformToBooleanArray(stringToTransform: string): Array<boolean> {
        const stringWithoutSquaredBrackets = this.removeSquaredBrackets(stringToTransform)
        if (stringWithoutSquaredBrackets === '') {
            return []
        } else {
            return stringWithoutSquaredBrackets.split(',').map(x => x.trim()).map(this.transformToBoolean)
        }
    }

    private removeSquaredBrackets(stringRepresentationOfArray: string): string {
        return stringRepresentationOfArray.replace('[', '').replace(']', '')
    }
}