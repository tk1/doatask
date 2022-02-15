const codeRunner = require('../code-runner-server');

/*
// The Python code added to functionDefinition and the functionCall looks like this
import json
class PythonCodeRunnerReturn:
    def __init__(self, return_value):
        self.returnValue = return_value
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
*/
const JSONImport = 'import json\n';
const PythonToJSONClass = "class PythonCodeRunnerReturn:\n\t" +
    "def __init__(self, return_value):\n\t\t" +
    "self.returnValue = return_value\n\t" +
    "def toJSON(self):\n\t\t" +
    "return json.dumps(self, default=lambda o: o.__dict__, sort_keys = True, indent = 4)\n";
const codeExecutionCommand = 'python';
const addOutputTransformationToJSONtoFuntionCall = (functionCall) => { return "print(PythonCodeRunnerReturn(" + functionCall + ").toJSON())" };
const addImports = code => JSONImport + PythonToJSONClass + code;
const port = 10001;
const languageFileEnding = '.py';

codeRunner.startCodeRunnerServer(codeExecutionCommand, addOutputTransformationToJSONtoFuntionCall, addImports, port, languageFileEnding);
