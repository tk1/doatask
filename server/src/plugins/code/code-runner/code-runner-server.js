const http = require('http');
const url = require('url');
const fs = require('fs');
var uuid = require('uuid');
const { spawn } = require('child_process');
require('dotenv').config();

const maxFunctionExecutionTimeInMilliSeconds = parseInt(process.env.CODE_EXECUTION_TIMEOUT);

function startCodeRunnerServer(buildCode, codeCompilationCommand, getCodeCompilationArguments, codeExecutionCommand, getCodeExecutionArguments, cleanUp, port, languageFileEnding) {

    const server = http.createServer((req, res) => {

        let responseBody = { returnValue: '', errorOutput: '' }
        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'POST') {
            const queryObject = url.parse(req.url, true).query;
            let functionDefinition = queryObject['functionDefinition'];
            let functionCall = queryObject['functionCall'];
            const codeFileNameWithoutExtension = generateUniqueFileName();
            const codeFileName = codeFileNameWithoutExtension + languageFileEnding;

            if (codeCompilationCommand) {
                const code = buildCode(codeFileNameWithoutExtension, functionDefinition, functionCall);
                fs.writeFile(codeFileName, code, error => {
                    if (error) {
                        throw new Error("Error writing code to file");
                    } else {
                        const codeCompilation = spawn(codeCompilationCommand, getCodeCompilationArguments(codeFileName), { timeout: maxFunctionExecutionTimeInMilliSeconds });
                        codeCompilation.stdout.on('data', (data) => {
                            console.error(`Error while compiling: ${data}`);
                            writeBodyAndEndResponse(res, { errorOutput: "Error compiling", returnValue: undefined });
                        });
                        codeCompilation.stderr.on('data', (data) => {
                            console.error(`Error while compiling: ${data}`);
                            writeBodyAndEndResponse(res, { errorOutput: `Internal error: Could not execute code (Reason unkown)`, returnValue: undefined });
                        });
                        codeCompilation.on('close', (code) => {
                            if (code !== 0) {
                                writeBodyAndEndResponse(res, { errorOutput: `The code execution took more than ${maxFunctionExecutionTimeInMilliSeconds} milliseconds and was canceled`, returnValue: undefined });
                            }
                        });
                        codeCompilation.on('exit', (code) => {
                            const codeExecution = spawn(codeExecutionCommand, getCodeExecutionArguments(codeFileNameWithoutExtension), { timeout: maxFunctionExecutionTimeInMilliSeconds });
                            codeExecution.stdout.on('data', (data) => {
                                writeBodyAndEndResponse(res, { errorOutput: undefined, returnValue: (JSON.parse(data.toString()))['returnValue'] });
                            });
                            codeExecution.stderr.on('data', (data) => {
                                console.error(`Error while executing: ${data}`);
                                writeBodyAndEndResponse(res, { errorOutput: `Internal error: Could not execute code (Reason unkown)`, returnValue: undefined });
                            });
                            codeExecution.on('close', (code) => {
                                if (code !== 0) {
                                    writeBodyAndEndResponse(res, { errorOutput: `The code execution took more than ${maxFunctionExecutionTimeInMilliSeconds} milliseconds and was canceled`, returnValue: undefined });
                                }
                            });
                            codeExecution.on('exit', (code) => {
                                cleanUp(codeFileNameWithoutExtension).forEach(file => deleteFile(file));
                            });
                        });
                    }
                });
            } else {
                const code = buildCode(codeFileNameWithoutExtension, functionDefinition, functionCall);
                fs.writeFile(codeFileName, code, error => {
                    if (error) {
                        throw new Error("Error writing code to file");
                    } else {
                        const codeExecution = spawn(codeExecutionCommand, getCodeExecutionArguments(codeFileNameWithoutExtension), { timeout: maxFunctionExecutionTimeInMilliSeconds });
                        codeExecution.stdout.on('data', (data) => {
                            writeBodyAndEndResponse(res, { errorOutput: undefined, returnValue: (JSON.parse(data.toString()))['returnValue'] });
                        });
                        codeExecution.stderr.on('data', (data) => {
                            writeBodyAndEndResponse(res, { errorOutput: `Internal error: Could not execute code (Reason ${data})`, returnValue: undefined });
                        });
                        codeExecution.on('close', (code) => {
                            if (code !== 0) {
                                writeBodyAndEndResponse(res, { errorOutput: `The code execution took more than ${maxFunctionExecutionTimeInMilliSeconds} milliseconds and was canceled`, returnValue: undefined });
                            }
                        });
                        codeExecution.on('exit', (code) => {
                            cleanUp(codeFileNameWithoutExtension).forEach(file => deleteFile(file));
                        });
                    }
                });
            }
        } else if (req.method === 'GET' && req.url === '/checkHealth') {
            res.statusCode = 200;
            writeBodyAndEndResponse(res, responseBody);
        } else {
            responseBody.errorOutput = 'Only POST methods are allowed';
            res.statusCode = 405;
            writeBodyAndEndResponse(res, responseBody);
        }
    });
    server.listen(port, '0.0.0.0');
}

function generateUniqueFileName() {
    return 'C' + uuid.v1().replaceAll('-', '');
}

function deleteFile(codeFileName) {
    if (fs.existsSync(codeFileName)) {
        fs.unlinkSync(codeFileName)
    }
}

function writeBodyAndEndResponse(res, responseBody) {
    res.write(JSON.stringify(responseBody))
    res.statusCode = 200;
    res.end();
}

exports.startCodeRunnerServer = startCodeRunnerServer;