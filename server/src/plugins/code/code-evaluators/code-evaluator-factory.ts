import { CodeTestSuite } from "../code-tests/code-test-suite";
import { CodeDto } from "../code.dto";
import { MethodStub } from "../method-stub";
import { CodeEvaluator } from "./code-evaluator";
import { JavaScriptEvaluator } from "./java-script-evaluator";
import { PythonEvaluator } from "./python-evaluator";

export class CodeEvaluatorFactory {
    
    static JAVA_SCRIPT_LANUGAGE_NAME = 'javascript'
    static PYTHON_LANUGAGE_NAME = 'pyhton'
    
    constructor() { }

    static getCodeEvaluator(codeDto: CodeDto, code: string):CodeEvaluator {

        switch (codeDto.language.toLowerCase()) {
            case this.JAVA_SCRIPT_LANUGAGE_NAME:
                return new JavaScriptEvaluator(code, codeDto.methodStub, codeDto.testSuite)
            case this.PYTHON_LANUGAGE_NAME:
                return new PythonEvaluator(code, codeDto.methodStub, codeDto.testSuite)
            default:
                break
        }
    }
}