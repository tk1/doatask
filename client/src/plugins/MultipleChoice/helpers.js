export function describe (details) {
  if (details.choices) {
    return details.choices.map(v => v.text).join('|')
  } else {
    return ''
  }
}
