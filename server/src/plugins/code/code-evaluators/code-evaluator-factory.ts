import { CodeDto } from "../code.dto";
import { CodeEvaluator } from "./code-evaluator";
import { JavaScriptEvaluator } from "./javascript/java-script-evaluator";
import { PythonEvaluator } from "./python/python-evaluator";

export class CodeEvaluatorFactory {
    
    static JAVA_SCRIPT_LANUGAGE_NAME = 'javascript'
    static PYTHON_LANUGAGE_NAME = 'python'
    
    constructor() { }

    static createCodeEvaluator(codeDto: CodeDto, code: string):CodeEvaluator {

        switch (codeDto.language.toLowerCase()) {
            case this.JAVA_SCRIPT_LANUGAGE_NAME:
                return new JavaScriptEvaluator(code, codeDto.methodStub, codeDto.testSuite)
            case this.PYTHON_LANUGAGE_NAME:
                return new PythonEvaluator(code, codeDto.methodStub, codeDto.testSuite)
            default:
                throw new Error('Language ' + codeDto.language + ' not supported')
        }
    }
}