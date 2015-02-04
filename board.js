/**
 * board.js - Routines for manipulating a 2d grid of cells with two states.
 */

function Board(size) {
    this.size = size
    this.cells = new Array(this.size * this.size)
    this.game = gamePresets[0]

    for (var i = 0; i < this.size * this.size; i++) {
        this.cells[i] = {
            'isAlive': false,
            'x': i % this.size,
            'y': Math.floor(i / this.size),
        }
    }

    /**
     * @param x The x-axis position of a cell, as an integer from 0 to this.size-1
     * @param y The y-axis position of a cell, as an integer from 0 to this.size-1
     * @return true if there is a cell at (x, y) and it's alive
     */
    this.isAlive = function(x, y) {
        if (x >= 0 && x < this.size && y >= 0 && y < this.size) {
            return this.cells[x + y * this.size].isAlive
        } else {
            return false
        }
    }

    /**
     * @param x The x-axis position of a cell, as an integer from 0 to this.size-1
     * @param y The y-axis position of a cell, as an integer from 0 to this.size-1
     * @param true If true, set the cell at this position to be alive.  Otherwise, set it to be dead.
     */
    this.setAlive = function(x, y, value) {
        if (x >= 0 && x < this.size && y >= 0 && y < this.size) {
            this.cells[x + y * this.size].isAlive = value;
        }
    }

    /**
     * Set every cell to dead
     */
    this.killAll = function() {
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].isAlive = false
        }
    }

    /**
     * Randomly assign a new state to every cell.
     *
     * @param p The probability that any individual cell will be alive
     */
    this.randomize = function(p) {
        console.log(p)
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].isAlive = Math.random() < p
        }
    }

    /**
     * Update the entire board based on the currently defined list of rules
     */
    this.step = function() {
        var neighborCounts = new Array(this.cells.length)

        /* Count the number of living neighbors that each cell has.  This must be computed before the main loop in
            order to capture the state of the board *before* any changes are made during this step. */
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                neighborCounts[x + y * this.size] =
                (this.isAlive(x - 1, y - 1)? 1 : 0) +
                (this.isAlive(x,     y - 1)? 1 : 0) +
                (this.isAlive(x + 1, y - 1)? 1 : 0) +
                (this.isAlive(x + 1, y    )? 1 : 0) +
                (this.isAlive(x + 1, y + 1)? 1 : 0) +
                (this.isAlive(x,     y + 1)? 1 : 0) +
                (this.isAlive(x - 1, y + 1)? 1 : 0) +
                (this.isAlive(x - 1, y    )? 1 : 0)
            }
        }

        /* For each cell, apply the first rule that matches its current state and number of neighbors, and apply it to
            the cell. */
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                var isAlive = this.isAlive(x, y)
                var neighborCount = neighborCounts[x + y * this.size]

                for (var i = this.game.rules.length - 1; i >= 0; i--) {
                    var rule = this.game.rules[i]
                    if (rule.aliveBefore == isAlive && rule.minNeighborCount <= neighborCount && rule.maxNeighborCount >= neighborCount) {
                        this.setAlive(x, y, !isAlive)
                        break;
                    }
                }
            }
        }
    }
}
