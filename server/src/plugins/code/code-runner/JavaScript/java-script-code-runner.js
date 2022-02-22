const codeRunner = require('./../code-runner-server');

const buildCode = (codeFileNameWithoutExtension, functionDefinition, functionCall) =>
    `${functionDefinition}
let output = {}
output['returnValue'] = ${functionCall};
console.log(JSON.stringify(output));`;
const codeCompilationCommand = undefined;
const getCodeCompilationArguments = (codeFileName) => undefined;
const codeExecutionCommand = 'node';
const getCodeExecutionArguments = (codeFileNameWithoutExtension) => [codeFileNameWithoutExtension + languageFileEnding];
const cleanUp = (codeFileNameWithoutExtension) => [codeFileNameWithoutExtension + languageFileEnding]
const port = 10000;
const languageFileEnding = '.js';

codeRunner.startCodeRunnerServer(buildCode, codeCompilationCommand, getCodeCompilationArguments, codeExecutionCommand, getCodeExecutionArguments, cleanUp, port, languageFileEnding);
