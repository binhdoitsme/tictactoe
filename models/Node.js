class Node {
    /**
     * Construct a new instance of this
     * @param {string} rep The character representation of this
     * @param {string} playerRef Name of the player this is referred to
     */
    constructor(rep, playerRef) {
        this.representation = rep;
        this.playerRef = playerRef;
    }

    /**
     * Returns HTML representation of this
     */
    renderNode() {
        return `${this.representation}`;
    }
}

module.exports = Node;