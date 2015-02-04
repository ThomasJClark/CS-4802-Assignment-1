/**
 * render.js - Main rendering functions for transforming the data into a document using d3
 */

var cellSize = 24;
var board = new Board(25)

var boardSvg = d3.select('#boardContainer').attr('viewBox', '0 0 ' + (cellSize * board.size) + ' ' + (cellSize * board.size))

var ruleList = d3.select('#rulesContainer')
var presetsList = d3.select('#presetsContainer')
var playId = undefined

/**
 * Draws the current board to the page by rendering squares in a uniform cartesian grid. Squares are
 * rendered only in locations where the cell is alive.
 */
function render(fade) {
    var cells = boardSvg.selectAll('rect').data(board.cells)
    cells.enter().append('rect')
        .style('stroke', '#DDDDDD')
        .style('stroke-width', 2)
        .attr('vector-effect', 'non-scaling-stroke')
        .attr('width', cellSize - 2)
        .attr('height', cellSize - 2)
        .attr('x', function(cell) { return 1 + cellSize * cell.x })
        .attr('y', function(cell) { return 1 + cellSize * cell.y })
        /* Create/destroy cells when they're clicked */
        .on('click', function(cell) {
            if (playId == undefined) {
                cell.isAlive = !cell.isAlive
                render(true)
            }
        })
        /* highlight cells when the cursor is over them */
        .on('mouseover', function() {
            if (playId == undefined) d3.select(this).style('stroke', '#337AB7')
        })
        .on('mouseout', function() {
            if (playId == undefined) d3.select(this).style('stroke', '#DDDDDD')
        })

    /* Make cells that are alive black and cells that are dead white */
	if (fade) {
        cells.transition().duration(200).style('fill', function(cell) { return cell.isAlive? 'black' : 'white' })
	} else {
        cells.style('fill', function(cell) { return cell.isAlive? 'black' : 'white' })
	}

    /* Render the list of rule presets */
    var presets = presetsList.selectAll('a').data(gamePresets)
    presets.enter().append('a')
        .text(function(game) { return game.name })
        .on('click', function(game) { board.game = game; render() })

    /* The currently assigned one should be styled as active */
    presets.classed({'list-group-item': true, 'active': function(game) { return game == board.game } })

    /* Render the list of rules */
    d3.select('#gameTitle').text(board.game.name)

    var rules = ruleList.selectAll('div').data(board.game.rules)
    rules.enter().append('div').attr('class', 'list-group-item')
    rules.exit().remove()
    rules.html(describeRule)
}


/**
 * Starts periodically updating the board
 */
function play() {
    board.step()
    render()
    playId = setInterval(function() { board.step(); render() }, 100)

    /* Disable all settings besides pause, and hide the play button. */
    d3.selectAll('button').attr('disabled', true)
    d3.select('#pause-button').attr('disabled', null)
    d3.select('#pause-button').style('display', 'inline-block')
    d3.select('#play-button').style('display', 'none')
}


/**
 * Stops periodically updating the board
 */
function pause() {
    if (playId) {
        clearInterval(playId)
        playId = undefined
    }

    /* Re-enable all settings, and hide the pause button. */
    d3.selectAll('button').attr('disabled', null)
    d3.select('#pause-button').style('display', 'none')
    d3.select('#play-button').style('display', 'inline-block')
}

/**
 * Utility function to get a string of HTML with a textual description of a rule
 */
function describeRule(rule) {
    var description = undefined
    if (rule.aliveBefore) {
        description = '<b>Die</b> if it'
    } else {
        description = '<b>Be born</b> if it'
    }

    function describeNeighborCount(count) {
        if (count == 1) return '1 neighbor'
        return count + ' neighbors'
    }

    /* Create a string describing the conditions of the rule in the most specific way possible */
    if (rule.minNeighborCount == 0 && rule.maxNeighborCount == 8) {
        description += ' is currently ' + (rule.aliveBefore? '<b>alive</b>': '<b>dead</b>')
    } else if (rule.minNeighborCount == rule.maxNeighborCount) {
        description += ' has <b>exactly ' + describeNeighborCount(rule.minNeighborCount) + '</b>'
    } else if (rule.minNeighborCount == 0) {
        description += ' has <b>' + describeNeighborCount(rule.maxNeighborCount) + ' or less</b>'
    } else if (rule.maxNeighborCount == 8) {
        description += ' has <b>at least ' + describeNeighborCount(rule.minNeighborCount) + '</b>'
    } else {
        description += ' has <b>' + rule.minNeighborCount + ' to ' + describeNeighborCount(rule.maxNeighborCount) + '</b>'
    }

    return description
}
