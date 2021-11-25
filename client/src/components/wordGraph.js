import * as d3 from 'd3'
import * as Tcs from 'tcs-engine'

export function init (regexp, maxLength) {
  const maxWidth = 512
  const minPixel = 4
  const standardSize = 20

  // remove previous svg and tooltip if any
  d3.selectAll('#word-svg svg').remove()
  d3.selectAll('.tooltip').remove()

  const re = Tcs.RegularExpression.parse(regexp)
  const automaton = re.equivalentAutomaton.minimize().renameStatesDFS()
  const alphabet = automaton.alphabet
  const wordCount = Math.pow(alphabet.symbols.length, maxLength)

  let orientation
  let width
  let height

  if (wordCount > maxWidth / minPixel) {
    orientation = 'portrait'
    width = (maxLength + 1) * standardSize
    height = wordCount * minPixel
  } else {
    orientation = 'landscape'
    width = maxWidth
    height = (maxLength + 1) * standardSize
  }

  let xSize, ySize
  if (orientation === 'portrait') {
    xSize = standardSize
    ySize = height / wordCount
  } else {
    xSize = width / wordCount
    ySize = standardSize
  }

  const svg = d3
    .select('#word-svg')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'wtooltip')
    .style('opacity', 0)
    .text('')

  let w
  const result = []

  for (let length = 0; length <= maxLength; length++) {
    const currResult = []
    result.push(currResult)
    const words = alphabet.genWords(length)
    while ((w = words.next().value) !== undefined) {
      const accepted = automaton.acceptsMemoMap(w)
      currResult.push({ word: w, accepted: accepted })
    }
  }

  // TODO use of currentLength is not elegant
  // find solution without y as in
  // https://bl.ocks.org/mbostock/4c5fad723c87d2fd8273
  let currentLength = -1
  svg.selectAll('g')
    .data(result)
    .enter()
    .append('g')
    .selectAll('rect')
    .data(d => d)
    .enter()
    .append('rect')
    .attr('class', d => { return d.accepted ? 'in' : 'out' })
    .attr('width', xSize)
    .attr('height', ySize)
    .attr('x', (d, i) => {
      if (orientation === 'portrait') {
        if (i === 0) {
          currentLength++
        }
        return xSize * currentLength
      } else {
        return i * xSize
      }
    })
    .attr('y', (d, i) => {
      if (orientation === 'portrait') {
        return i * ySize
      } else {
        if (i === 0) {
          currentLength++
        }
        return ySize * currentLength
      }
    })
    .on('mouseover', function (d) {
      tooltip.transition()
        .duration(200)
        .style('opacity', 0.9)
      tooltip
        .text(d.word ? d.word : 'E')
        .classed(d.accepted ? 'in' : 'out', true)
        .classed(d.accepted ? 'out' : 'in', false)
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 28) + 'px')
    })
    .on('mouseout', function (d) {
      tooltip.transition()
        .duration(500)
        .style('opacity', 0)
    })
}
