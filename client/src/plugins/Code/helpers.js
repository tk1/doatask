export function describe (details) {
  if (details.language) {
    return details.language + ', ' + details.methodStub?.functionName
  } else {
    return ''
  }
}
