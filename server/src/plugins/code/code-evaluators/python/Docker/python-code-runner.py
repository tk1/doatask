from bottle import run, request, route

@route('/runCode', method='POST')
def runCode():

	name_of_return_variable = 'return_variable'
	function_definition = request.params['functionDefinition']
	function_call = request.params['functionCall']
	outputMap = {}
	error_output = ''
	error_occured = False

	testRunCode = function_definition + '\n' + name_of_return_variable + ' = ' + function_call
	
	try:
		exec(testRunCode, globals(), outputMap)
	except Exception as exception:
		error_output = exception
		error_occured = True

	if error_occured:
		return_variable = error_output
	else:
		return_variable = outputMap[name_of_return_variable]

	return str(return_variable)

run(host='0.0.0.0', port=8081, debug=True)