import { FunctionCallBuilder } from "./function-call-builder";
import { JavaFunctionCallBuilder } from "./java-function-call-builder";
import { JavaScriptFunctionCallBuilder } from "./java-script-function-call-builder";
import { PythonFunctionCallBuilder } from "./python-function-call-builder";

export class FunctionCallBuilderFactory {

    private static JAVA_SCRIPT_LANUGAGE_NAME = 'javascript'
    private static PYTHON_LANUGAGE_NAME = 'python'
    private static JAVA_LANGUAGE_NAME = 'java'

    constructor() { }

    static createFunctionCallBuilder(language: string): FunctionCallBuilder {

        switch (language.trim().toLowerCase()) {
            case this.JAVA_SCRIPT_LANUGAGE_NAME:
                return new JavaScriptFunctionCallBuilder()
            case this.PYTHON_LANUGAGE_NAME:
                return new PythonFunctionCallBuilder()
            case this.JAVA_LANGUAGE_NAME:
                return new JavaFunctionCallBuilder()
            default:
                throw new Error('Language ' + language + ' not supported')
        }
    }
}