const BoardNode = require("../models/Node");
class Board {
    /**
     * Construct a new instance of Board
     * @param {number} size The size of this
     */
    constructor(size) {
        this.gameBoard = new Array(Math.pow(size, 2));
        this.gameBoard.fill(undefined);
        this.size = size;
    }

    /**
     * Check whether a player has won the game
     * @returns {string} undefined if no one won, 
     *                   a player name if one has won
     */
    checkWin() {
        const size = this.size;
        const moveMade = this.gameBoard.filter(n => n !== undefined).length;
        if (moveMade < this.size) {
            return undefined;
        } else if (moveMade === this.gameBoard.length) {
            return null;
        } else {
            // check diagonals
            const diagonalResult = this.checkDiagonal(size);
            if (diagonalResult) {
                return diagonalResult;
            } else {
                // check columns
                const columnResult = this.checkColumn(size);
                if (columnResult) {
                    return columnResult;
                } else {
                    const rowResult = this.checkRow(size);
                    if (rowResult) {
                        return rowResult;
                    } else {
                        if (moveMade === this.gameBoard.length) {
                            return null;
                        }
                    }
                }
            }
        }
    }

    /**
     * Check the board for winner using a predefined formula
     * @param {number} upperBound The upper bound of this check
     * @param {number} initial Initial check value
     * @param {number} increment Incremental between check values
     * @returns {string}
     */
    checkByTraverse(upperBound, initial, increment) {
        let checkingPlayer;
        for (let i = initial; i < upperBound; i += increment) {
            if (!this.gameBoard[i]) {
                return undefined;
            } else {
                if (!checkingPlayer) {
                    checkingPlayer = this.gameBoard[i].playerRef;
                    continue;
                } else {
                    const thisPlayer = this.gameBoard[i].playerRef;
                    if (checkingPlayer === thisPlayer) {
                        continue;
                    } else {
                        return undefined;
                    }
                }
            }
        }
        return checkingPlayer;
    }

    /**
     * Check if one player has won by diagonal
     * @param {number} size The size of this board
     * @returns {string}
     */
    checkDiagonal(size) {
        let winningPlayer = this.checkByTraverse(size * size, 0, size + 1);
        if (winningPlayer) {
            return winningPlayer;
        } else {
            return this.checkByTraverse(size * (size - 1) + 1, size - 1, size - 1);
        }
    }

    /**
     * Check if one player has won by column
     * @param {number} size the size of this board
     * @returns {string}
     */
    checkColumn(size) {
        for (let i = 0; i < size; i++) {
            const winningPlayer = this.checkByTraverse(size * size, i, size);
            if (winningPlayer) {
                return winningPlayer;
            }
        }
        return undefined;
    }

    /**
     * Check if one player has won by row
     * @param {number} size the size of this board
     * @returns {string}
     */
    checkRow(size) {
        for (let i = 0; i < size * size; i += size) {
            const winningPlayer = this.checkByTraverse(i + size, i, 1);
            if (winningPlayer) {
                return winningPlayer;
            }
        }
        return undefined;
    }

    /**
     * @returns {string[][]}
     */
    renderBoard() {
        // return a 2d array
        let board = [];
        for (let i = 0; i < this.size; i++) {
            const rowStartIndex = i * this.size;
            let row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(this.gameBoard[rowStartIndex + j] ? this.gameBoard[rowStartIndex + j].renderNode() : undefined);
            }
            board.push(row);
        }
        return board;
    }

    /**
     * Make a player's move on this
     * @param {number} pos The position the player made a move
     * @param {BoardNode} node The active node
     */
    makeMove(pos, node) {
        if (!this.gameBoard[pos]) {
            this.gameBoard[pos] = node;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Board;