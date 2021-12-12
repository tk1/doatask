import { MethodStub } from '../../method-stub';
import { CodeTypes } from '../../code-types';
import { Tmp } from '../test-method-parameters';
import { JavaScriptFunctionCallBuilder } from '../../function-call-builders/java-script-function-call-builder';

describe('JavaScript function call builder', () => {

    const jfcb = new JavaScriptFunctionCallBuilder();

    test('No parameters', () => {
        const methodStub = new MethodStub("testFunction", [], CodeTypes.booleanType)
        const testParameter = []
        const functionCall = jfcb.buildFunctionCall(methodStub, testParameter)
        expect(functionCall).toStrictEqual(methodStub.functionName + '();')
    });

    test('Int parameter', () => {
        const methodStub = new MethodStub("testFunction", [Tmp.intParam], CodeTypes.booleanType)
        const testParameter = [3]
        const functionCall = jfcb.buildFunctionCall(methodStub, testParameter)
        expect(functionCall).toStrictEqual(methodStub.functionName + '(3);')
    });

    test('String parameter', () => {
        const methodStub = new MethodStub("testFunction", [Tmp.stringParam1], CodeTypes.booleanType)
        const testParameter = ['stringParameter']
        const functionCall = jfcb.buildFunctionCall(methodStub, testParameter)
        expect(functionCall).toStrictEqual(methodStub.functionName + "('stringParameter');")
    });

    test('Boolean parameter', () => {
        const methodStub = new MethodStub("testFunction", [Tmp.booleanParam], CodeTypes.booleanType)
        const testParameter = [true]
        const functionCall = jfcb.buildFunctionCall(methodStub, testParameter)
        expect(functionCall).toStrictEqual(methodStub.functionName + '(true);')
    });

    test('Int array parameter', () => {
        const methodStub = new MethodStub("testFunction", [Tmp.intArrayParam], CodeTypes.booleanType)
        const testParameter = [[-1, 0, 1, 2, 3]]
        const functionCall = jfcb.buildFunctionCall(methodStub, testParameter)
        expect(functionCall).toStrictEqual(methodStub.functionName + '([-1, 0, 1, 2, 3]);')
    });

    test('String array parameter', () => {
        const methodStub = new MethodStub("testFunction", [Tmp.stringArrayParam], CodeTypes.booleanType)
        const testParameter = [['first', 'second', 'third']]
        const functionCall = jfcb.buildFunctionCall(methodStub, testParameter)
        expect(functionCall).toStrictEqual(methodStub.functionName + "(['first', 'second', 'third']);")
    });

    test('Boolean array parameter', () => {
        const methodStub = new MethodStub("testFunction", [Tmp.booleanArrayParam], CodeTypes.booleanType)
        const testParameter = [[true, false, true, false]]
        const functionCall = jfcb.buildFunctionCall(methodStub, testParameter)
        expect(functionCall).toStrictEqual(methodStub.functionName + '([true, false, true, false]);')
    });

    test('All parameter types', () => {
        const parameterTypes = [Tmp.intParam, Tmp.stringParam1, Tmp.booleanParam, Tmp.intArrayParam, Tmp.stringArrayParam, Tmp.booleanArrayParam]
        const methodStub = new MethodStub("testFunction", parameterTypes, CodeTypes.booleanType)
        const testParameter = [1, 'abc', true, [1, 2, 3], ['a', 'b', 'c'], [true, false]]
        const functionCall = jfcb.buildFunctionCall(methodStub, testParameter)
        expect(functionCall).toStrictEqual(methodStub.functionName + "(1, 'abc', true, [1, 2, 3], ['a', 'b', 'c'], [true, false]);")
    });
});