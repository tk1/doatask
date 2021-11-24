import { PythonStringToTypeJavaScriptTransformer } from "../../code-evaluators/python/python-string-to-js-transformer";
import { CodeTypes } from "../../code-types";

describe('Python string to JavaScript transformer', () => {

    const pstJSt = new PythonStringToTypeJavaScriptTransformer()

    test('Int output', () => {
        const result = pstJSt.transform("123", CodeTypes.intType)
        const result2 = pstJSt.transform("-123", CodeTypes.intType)
        expect(result).toStrictEqual(123)
        expect(result2).toStrictEqual(-123)
    });

    test('String output', () => {
        const result = pstJSt.transform("abc", CodeTypes.stringType)
        const result2 = pstJSt.transform("123", CodeTypes.stringType)
        expect(result).toStrictEqual("abc")
        expect(result2).toStrictEqual("123")
    });

    test('Boolean output', () => {
        const result = pstJSt.transform("True", CodeTypes.booleanType)
        const result2 = pstJSt.transform("False", CodeTypes.booleanType)
        expect(result).toStrictEqual(true)
        expect(result2).toStrictEqual(false)
    });

    test('Int array output', () => {
        const result = pstJSt.transform("[1, 2, 3]", CodeTypes.intArrayType)
        const result2 = pstJSt.transform("[-11, -2, 0]", CodeTypes.intArrayType)
        const result3 = pstJSt.transform("[]", CodeTypes.intArrayType)
        expect(result).toStrictEqual([1, 2, 3])
        expect(result2).toStrictEqual([-11, -2, 0])
        expect(result3).toStrictEqual([])
    });

    test('String array output', () => {
        const result = pstJSt.transform("['abc', '', '123']", CodeTypes.stringArrayType)
        const result2 = pstJSt.transform("[]", CodeTypes.stringArrayType)
        expect(result).toStrictEqual(['abc', '', '123'])
        expect(result2).toStrictEqual([])
    });

    test('Boolean array output', () => {
        const result = pstJSt.transform('[True, False]', CodeTypes.booleanArrayType)
        const result2 = pstJSt.transform('[False, True, False, True]', CodeTypes.booleanArrayType)
        const result3 = pstJSt.transform('[]', CodeTypes.booleanArrayType)
        expect(result).toStrictEqual([true, false])
        expect(result2).toStrictEqual([false, true, false, true])
        expect(result3).toStrictEqual([])
    });
});