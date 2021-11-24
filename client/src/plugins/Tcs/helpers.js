export function describe (details) {
  return `${details.regexp}, |w| >= ${details.minLength || 0}`
}
