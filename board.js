/**
 * board.js - Routines for manipulating a 2d grid cells with two states.
 */

var boardSize = 20
var board = new Array(boardSize * boardSize)

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
        return board[x + y * boardSize]
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
