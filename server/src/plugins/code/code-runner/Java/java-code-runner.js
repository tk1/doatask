const codeRunner = require('./../code-runner-server');

const buildCode = (codeFileNameWithoutExtension, functionDefinition, functionCall) =>
    `import com.google.gson.Gson;
public class ${codeFileNameWithoutExtension} {
    public static void main(String args[]) {
        Gson gson = new Gson();
        JsonOutputClass joc = new JsonOutputClass();
        ${codeFileNameWithoutExtension} tc = new ${codeFileNameWithoutExtension}();
        joc.returnValue = tc.${functionCall}
        System.out.println(gson.toJson(joc));
    }
                            
    ${functionDefinition}
}
class JsonOutputClass {
    public Object returnValue;
        JsonOutputClass(){}
}`;
const codeCompilationCommand = 'javac';
const getCodeCompilationArguments = (codeFileName) => ['-cp', '.;gson-2.9.0.jar', codeFileName];
const codeExecutionCommand = 'java';
const getCodeExecutionArguments = (codeFileNameWithoutExtension) => ['-cp', '.;gson-2.9.0.jar', codeFileNameWithoutExtension];
const cleanUp = (codeFileNameWithoutExtension) => [codeFileNameWithoutExtension + languageFileEnding, codeFileNameWithoutExtension + '.class']
const port = 10002;
const languageFileEnding = '.java'

codeRunner.startCodeRunnerServer(buildCode, codeCompilationCommand, getCodeCompilationArguments, codeExecutionCommand, getCodeExecutionArguments, cleanUp, port, languageFileEnding);