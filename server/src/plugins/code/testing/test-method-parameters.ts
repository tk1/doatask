import { CodeTypes } from "../code-types"
import { MethodParameter } from "../method-parameter"

export class Tmp {
    public static readonly booleanParam = new MethodParameter("bParam1", CodeTypes.booleanType)
    public static readonly stringParam1 = new MethodParameter("sParam1", CodeTypes.stringType)
    public static readonly stringParam2 = new MethodParameter("sParam2", CodeTypes.stringType)
    public static readonly intParam = new MethodParameter("nParam1", CodeTypes.intType)
    public static readonly intParam2 = new MethodParameter("nParam2", CodeTypes.intType)
    public static readonly booleanArrayParam = new MethodParameter("baParam1", CodeTypes.booleanArrayType)
    public static readonly stringArrayParam = new MethodParameter("saParam1", CodeTypes.stringArrayType)
    public static readonly intArrayParam = new MethodParameter("iaParam1", CodeTypes.intArrayType)
}