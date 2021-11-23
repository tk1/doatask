import { MethodParameter } from "../method-parameter"

export class Tmp {
    public static readonly booleanParam = new MethodParameter("bParam1", "boolean")
    public static readonly stringParam1 = new MethodParameter("sParam1", "string")
    public static readonly stringParam2 = new MethodParameter("sParam2", "string")
    public static readonly intParam = new MethodParameter("nParam1", "int")
    public static readonly intParam2 = new MethodParameter("nParam2", "int")
    public static readonly booleanArrayParam = new MethodParameter("baParam1", "booleanArray")
    public static readonly stringArrayParam = new MethodParameter("saParam1", "stringArray")
    public static readonly intArrayParam = new MethodParameter("iaParam1", "intArray")
}