const http = require('http');
const url = require('url');
const fs = require('fs');
var uuid = require('uuid');
const { spawn } = require('child_process');

const hostname = '0.0.0.0';
const maxFunctionExecutionTimeInMilliSeconds = 5000;
let codeExecutionCommand = '';
let addImports = () => { };
let addOutputTransformationToJSONtoFuntionCall = () => { };

function startCodeRunnerServer(cec, tcotJ, ai, port) {
    codeExecutionCommand = cec;
    addOutputTransformationToJSONtoFuntionCall = tcotJ;
    addImports = ai;

    const server = http.createServer((req, res) => {

        let responseBody = { returnValue: '', errorOutput: '' }
        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'POST') {
            const queryObject = url.parse(req.url, true).query;
            let functionDefinition = queryObject['functionDefinition'];
            let functionCall = queryObject['functionCall'];
            const codeFileName = generateUniqueFileName();

            functionDefinition = addImports(functionDefinition);
            functionCall = addOutputTransformationToJSONtoFuntionCall(functionCall);
            fs.writeFile(codeFileName, functionDefinition + "\n" + functionCall, error => {
                if (error) {
                    throw new Error("Error writing code to file");
                } else {
                    const codeExecutor = spawn(codeExecutionCommand, [codeFileName], { timeout: maxFunctionExecutionTimeInMilliSeconds });
                    codeExecutor.stdout.on('data', (data) => {
                        deleteFile(codeFileName);
                        responseBody.errorOutput = error;
                        responseBody.returnValue = (JSON.parse(data.toString()))['returnValue'];
                        writeBodyAndEndResponse(res, responseBody);
                    });
                    codeExecutor.stderr.on('data', (data) => {
                        deleteFile(codeFileName);
                        responseBody.returnValue = undefined
                        responseBody.errorOutput = `Internal error: Could not execute code (Reason unkown)`;
                        writeBodyAndEndResponse(res, responseBody);
                    });
                    codeExecutor.on('close', (code) => {
                        deleteFile(codeFileName);
                        responseBody.returnValue = undefined
                        responseBody.errorOutput = `The code execution took more than ${maxFunctionExecutionTimeInMilliSeconds} milliseconds and was canceled`;
                        writeBodyAndEndResponse(res, responseBody);
                    });
                }
            });
        } else if (req.method === 'GET' && req.url === '/checkHealth') {
            res.statusCode = 200;
            writeBodyAndEndResponse(res, responseBody);
        } else {
            responseBody.errorOutput = 'Only POST methods are allowed';
            res.statusCode = 405;
            writeBodyAndEndResponse(res, responseBody);
        }
    });
    server.listen(port, hostname);
}

function generateUniqueFileName() {
    return uuid.v1();
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