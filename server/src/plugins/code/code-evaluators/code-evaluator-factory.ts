import { CodeTestSuite } from "../code-tests/code-test-suite";
import { MethodStub } from "../method-stub";
import { CodeEvaluator } from "./code-evaluator";
import { JavaScriptEvaluator } from "./java-script-evaluator";
import { PythonEvaluator } from "./python-evaluator";

export class CodeEvaluatorFactory {
    
    static JAVA_SCRIPT_LANUGAGE_NAME = 'javascript'
    static PYTHON_LANUGAGE_NAME = 'pyhton'
    
    constructor() { }

    static getCodeEvaluator(language:string, code:string, methodStub: MethodStub, testSuite:CodeTestSuite):CodeEvaluator {
        switch (language.toLocaleLowerCase()) {
            case this.JAVA_SCRIPT_LANUGAGE_NAME:
                return new JavaScriptEvaluator(code, methodStub, testSuite)
            case this.PYTHON_LANUGAGE_NAME:
                return new PythonEvaluator(code, methodStub, testSuite)
            default:
                break
        }
    }
}