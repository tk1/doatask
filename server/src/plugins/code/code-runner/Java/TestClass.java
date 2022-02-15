import com.google.gson.Gson;

public class TestClass {

    public static void main(String args[]) {
		Gson gson = new Gson();
		JsonOutputClass joc = new JsonOutputClass();
		TestClass tc = new TestClass();
		joc.returnValue = tc.testMethod(1,10);
		System.out.println(gson.toJson(joc));
    }
	
	public int[] testMethod(int a, int b) {
		int array[] = { 1, 2, 3, 4, 5 };
		return array;
	}
}

class JsonOutputClass {
	public Object returnValue;
	JsonOutputClass(){}
}