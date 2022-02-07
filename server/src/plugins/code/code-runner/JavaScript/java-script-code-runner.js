const codeRunner = require('../code-runner-server');

const codeExecutionCommand = 'node';
const addOutputTransformationToJSONtoFuntionCall = (functionCall) => { return "let output = {}\noutput['returnValue'] = " + functionCall + ";\nconsole.log(JSON.stringify(output));" };
const addImports = x => x;
const port = 10000;

codeRunner.startCodeRunnerServer(codeExecutionCommand, addOutputTransformationToJSONtoFuntionCall, addImports, port);