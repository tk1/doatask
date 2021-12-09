from bottle import run, request, route
import json


class PythonCodeRunnerReturn:
    def __init__(self, return_value, error_output):
        self.returnValue = return_value
        self.errorOutput = error_output

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


@route("/runCode", method="POST")
def runCode():

    name_of_return_variable = "return_variable"
    function_definition = request.params["functionDefinition"]
    function_call = request.params["functionCall"]
    output_map = {}
    return_variable = ""
    error_output = ""

    testCode = (
        function_definition + "\n" + name_of_return_variable + " = " + function_call
    )

    try:
        exec(testCode, globals(), output_map)
        return_variable = output_map[name_of_return_variable]
    except Exception as exception:
        error_output = exception

    output = PythonCodeRunnerReturn(return_variable, error_output).toJSON()
    return output


@route("/checkHealth", method="GET")
def checkHealth():
    return

run(host="0.0.0.0", port=10001, debug=True)
