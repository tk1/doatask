const codeRunner = require('../code-runner-server');

const JsonImport = "import org.json.JSONObject;\n";


const codeExecutionCommand = 'java';
const addOutputTransformationToJSONtoFuntionCall = (functionCall) => { return "let output = {}\noutput['returnValue'] = " + functionCall + ";\nconsole.log(JSON.stringify(output));" };
const addImports = x => x;
const port = 10002;
const languageFileEnding = '.java'

codeRunner.startCodeRunnerServer(codeExecutionCommand, addOutputTransformationToJSONtoFuntionCall, addImports, port, languageFileEnding);