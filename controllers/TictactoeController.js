const Board = require("../models/Board");
const BoardNode = require("../models/Node");

class TictactoeController {
    /**
     * Construct a new instance of this
     * @param {number} size the size of the board
     * @param {string[]} playerNames the names of two players
     * @param {string[]} playerReps the reps of two players
     * @requires playerNames.length == 2
     */
    constructor(size, playerNames, playerReps) {
        this.board = new Board(size);
        this.gamesPlayed = 0;
        const mapValues = [];

        playerNames.forEach(playerName => {
            mapValues.push([playerName, 0]);
        });
        this.gameHistory = new Map(mapValues);
        this.playerNodes = [];
        for (let i = 0; i < 2; i++) {
            this.playerNodes.push(new BoardNode(playerReps[i], playerNames[i]));
        }
        this.activePlayer = 0;
    }

    /**
     * Render the game board
     */
    renderGame() {
        return this.board.renderBoard();
    }

    /**
     * Update the board and check for winner after each player's move
     * @param {number} pos The position the player made the move
     */
    renderMove(pos) {
        if (this.board.makeMove(pos, this.playerNodes[this.activePlayer])) {
            this.activePlayer = (this.activePlayer + 1) % 2;
            let result = this.checkWin();
            if (result !== undefined) {
                return result;
            }
        }
    }

    /**
     * Check if a player has won the game
     */
    checkWin() {
        console.log(this.board.checkWin());
        return this.board.checkWin();
    }

    /**
     * Reset this board
     */
    reset() {
        this.board = new Board(this.board.size);
    }
}

module.exports = TictactoeController;