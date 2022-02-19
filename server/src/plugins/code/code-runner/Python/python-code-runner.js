const codeRunner = require('./../code-runner-server');

const buildCode = (codeFileNameWithoutExtension, functionDefinition, functionCall) =>
    `import json
class PythonCodeRunnerReturn:
    def __init__(self, return_value):
        self.returnValue = return_value
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys = True, indent = 4)

${functionDefinition}
print(PythonCodeRunnerReturn(${functionCall}).toJSON())`;
const codeCompilationCommand = undefined;
const getCodeCompilationArguments = (codeFileName) => undefined;
const codeExecutionCommand = 'python';
const getCodeExecutionArguments = (codeFileNameWithoutExtension) => [codeFileNameWithoutExtension + languageFileEnding];
const cleanUp = (codeFileNameWithoutExtension) => [codeFileNameWithoutExtension + languageFileEnding]
const port = 10001;
const languageFileEnding = '.py';

codeRunner.startCodeRunnerServer(buildCode, codeCompilationCommand, getCodeCompilationArguments, codeExecutionCommand, getCodeExecutionArguments, cleanUp, port, languageFileEnding);
