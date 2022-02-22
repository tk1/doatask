export class FunctionCallBuilderUtil {

    public buildIntTypeParameter(intParameter: number): string {
        return intParameter.toString();
    }

    public buildStringTypeParameterWithSingleQuotes(stringParameter: string): string {
        return "'" + stringParameter + "'";
    }

    public buildStringTypeParameterWithDoubleQuotes(stringParameter: string): string {
        return "\"" + stringParameter + "\"";
    }

    public buildBooleanTypeParameterWithCapital(booleanParameter: boolean): string {
        return booleanParameter ? 'True' : 'False';
    }

    public buildBooleanTypeParameterLowerCase(booleanParameter: boolean): string {
        return booleanParameter ? 'true' : 'false';
    }


    public buildArrayTypeParameterWithSquaredBrackets(arrayParameter: Array<any>, elementBuilder: (element: any) => string): string {

        let result: string = undefined

        for (let currentElementInArray of arrayParameter) {
            if (result === undefined) {
                result = '' + elementBuilder(currentElementInArray)
            } else {
                result += ', ' + elementBuilder(currentElementInArray)
            }
        }

        return '[' + result + ']'
    }

    public buildArrayTypeParameterWithCurlyBrackets(arrayParameter: Array<any>, elementBuilder: (element: any) => string): string {

        let result: string = undefined

        for (let currentElementInArray of arrayParameter) {
            if (result === undefined) {
                result = '' + elementBuilder(currentElementInArray)
            } else {
                result += ', ' + elementBuilder(currentElementInArray)
            }
        }

        return '{' + result + '}'
    }
}