/**
 * board.js - Routines for manipulating a 2d grid cells with two states.
 */

var boardSize = 20
var board = new Array(boardSize * boardSize)
var rules = [
    { 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 1, 'aliveAfter': false },
    { 'aliveBefore': true, 'minNeighborCount': 4, 'maxNeighborCount': 8, 'aliveAfter': false },
    { 'aliveBefore': false, 'minNeighborCount': 3, 'maxNeighborCount': 3, 'aliveAfter': true }
]

for (var i = 0; i < boardSize * boardSize; i++) {
    board[i] = {
        'isAlive': false,
        'x': i % boardSize,
        'y': Math.floor(i / boardSize),
    }
}

/**
 * @param x The x-axis position of a cell, as an integer from 0 to boardSize-1
 * @param y The y-axis position of a cell, as an integer from 0 to boardSize-1
 * @return true if there is a cell at (x, y) and it's alive
 */
board.isAlive = function(x, y) {
    if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
        return board[x + y * boardSize].isAlive
    } else {
        return false
    }
}

/**
 * @param x The x-axis position of a cell, as an integer from 0 to boardSize-1
 * @param y The y-axis position of a cell, as an integer from 0 to boardSize-1
 * @param true If true, set the cell at this position to be alive.  Otherwise, set it to be dead.
 */
board.setAlive = function(x, y, value) {
    if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
        board[x + y * boardSize].isAlive = value;
    }
}

/**
 * Randomly assign a new state to every cell, with a 70% probability that any given cell will be dead and a 30%
 * probability it will be alive.
 */
board.randomize = function() {
    for (var i = 0; i < board.length; i++) {
        board[i].isAlive = Math.random() > 0.7
    }
}

/**
 * Update the entire board based on the currently defined list of rules
 */
board.step = function() {
    var neighborCounts = new Array(board.length)

    /* Count the number of living neighbors that each cell has.  This must be computed before the main loop in order to
        capture the state of the board *before* any changes are made during this step. */
    for (var x = 0; x < boardSize; x++) {
        for (var y = 0; y < boardSize; y++) {
            neighborCounts[x + y * boardSize] =
                (board.isAlive(x - 1, y - 1)? 1 : 0) +
                (board.isAlive(x,     y - 1)? 1 : 0) +
                (board.isAlive(x + 1, y - 1)? 1 : 0) +
                (board.isAlive(x + 1, y    )? 1 : 0) +
                (board.isAlive(x + 1, y + 1)? 1 : 0) +
                (board.isAlive(x,     y + 1)? 1 : 0) +
                (board.isAlive(x - 1, y + 1)? 1 : 0) +
                (board.isAlive(x - 1, y    )? 1 : 0)
        }
    }

    /* For each cell, apply the first rule that matches its current state and number of neighbors, and apply it to the
        cell. */
    for (var x = 0; x < boardSize; x++) {
        for (var y = 0; y < boardSize; y++) {
            var isAlive = board.isAlive(x, y)
            var neighborCount = neighborCounts[x + y * boardSize]

            for (var i = rules.length - 1; i >= 0; i--) {
                if (rules[i].aliveBefore == isAlive && rules[i].minNeighborCount <= neighborCount && rules[i].maxNeighborCount >= neighborCount) {
                    board.setAlive(x, y, rules[i].aliveAfter)
                    break;
                }
            }
        }
    }
}
