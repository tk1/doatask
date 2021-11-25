import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class JavaCodeRunner {

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8082), 0);
        server.createContext("/runCode", new RunCodeHandler());
        server.setExecutor(null);
        server.start();
    }

    static class RunCodeHandler implements HttpHandler {
        
        private static final String FUNCTION_DEFINTION_QUERY_KEY = "functionDefinition";
        private static final String FUNCTION_CALL_QUERY_KEY = "functionCall";

        @Override
        public void handle(HttpExchange httpExchange) throws IOException {

            String response = "";
            int returnCode = 0;
            
            if(httpExchange.getRequestMethod().equals("POST")) {
                
                Map<String,String> queryParameterMap = parseRequestQuery(httpExchange.getRequestURI().getRawQuery());

                String functionDefinition = queryParameterMap.get(FUNCTION_DEFINTION_QUERY_KEY);
                String functionCall = queryParameterMap.get(FUNCTION_CALL_QUERY_KEY);

                System.out.println(functionDefinition);
                System.out.println(functionCall);

                // TODO use compiler api to run the code
                //https://stackoverflow.com/questions/2156842/how-to-run-code-compiled-by-javacompiler

                response = "Success";
                returnCode = 200;

            } else {
                response = "Only POST requests are accepted";
                returnCode = 404;
            }
            
            httpExchange.sendResponseHeaders(returnCode, response.length());
            OutputStream os = httpExchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
        
        private Map<String, String> parseRequestQuery(String query) {
            
            Map<String,String> queryParameterMap =  new HashMap<>();
         
            Arrays.stream(query.split("&")).forEach(queryParameter -> {
                String[] queryParameterParts = queryParameter.split("=");
                String queryParameterKey = queryParameterParts[0];
                String queryParameterValue;
                try {
                    queryParameterValue = decode(queryParameterParts[1]);
                    queryParameterMap.put(queryParameterKey, queryParameterValue);
                } catch (UnsupportedEncodingException e) {                   
                }       
            });
            return queryParameterMap;
        }

        private String decode(String value) throws UnsupportedEncodingException {
            return URLDecoder.decode(value, StandardCharsets.UTF_8.toString());
        }
    }
}