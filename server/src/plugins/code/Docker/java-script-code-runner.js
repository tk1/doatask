const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 10000;

const server = http.createServer((req, res) => {

    let responseBody = { returnValue: '', errorOutput: '' }
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST') {
        const queryObject = url.parse(req.url, true).query;
        const functionDefinition = queryObject['functionDefinition'];
        const functionCall = queryObject['functionCall'];

        try {
            responseBody.returnValue = eval(functionDefinition + '\n' + functionCall);
            res.statusCode = 200;
        } catch (error) {
            responseBody.returnValue = undefined
            responseBody.errorOutput = error === '' ? 'Could not execute code' : error;
            res.statusCode = 400;
        }
    } else {
        responseBody.errorOutput = 'Only POST methods are allowed';
        res.statusCode = 405;
    }
    res.write(JSON.stringify(responseBody))
    res.end();
});

server.listen(port, hostname);