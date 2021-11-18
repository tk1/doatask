import * as d3 from 'd3'
import * as Tcs from 'tcs'

export function init(automaton, maxLength) {
    // TODO use memoization

    var maxWidth = 1024
    var minPixel = 4
    var standardSize = 20

    // remove previous svg and tooltip if any
    d3.selectAll('#word-svg svg').remove()
    d3.selectAll('.tooltip').remove()

    let re = Tcs.RegularExpression.parse('a(a+b)*')
    automaton = re.equivalentAutomaton.minimize().renameStatesDFS()
    var alphabet = automaton.alphabet
    var wordCount = Math.pow(alphabet.symbols.length, maxLength)

    if (wordCount > maxWidth / minPixel) {
        var orientation = 'portrait'
        var width = (maxLength + 1) * standardSize
        var height = wordCount * minPixel
    } else {
        orientation = 'landscape'
        width = maxWidth
        height = (maxLength + 1) * standardSize
    }

    var xSize, ySize
    if (orientation === 'portrait') {
        xSize = standardSize
        ySize = height / wordCount
    } else {
        xSize = width / wordCount
        ySize = standardSize
    }

    var svg = d3
        .select('#word-svg')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    var tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'wtooltip')
        .style('opacity', 0)
        .text('')

    var w
    var result = []

    for (let length = 0; length <= maxLength; length++) {
        var currResult = []
        result.push(currResult)
        var words = alphabet.genWords(length)
        while ((w = words.next().value) !== undefined) {
            var accepted = automaton.acceptsMemoMap(w)
            currResult.push({ word: w, accepted: accepted })
        }
    }
//     result = [[{word: '', accepted: true}],
// [{word:'a', accepted: false}, {word:'b', accepted: true}]]

    // TODO use of currentLength is not elegant
    // find solution without y as in
    // https://bl.ocks.org/mbostock/4c5fad723c87d2fd8273
    var currentLength = -1
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
