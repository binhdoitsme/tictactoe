let boardHtml, table, tableCell, restartBtn;
const loadBoard = (boardHtml) => {
    document.querySelector('.gameplay-container').innerHTML = boardHtml;
}
document.addEventListener('gameStart', () => {
    loadBoard(boardHtml);
    table = document.querySelector('table.tictactoe-frame');
    if (table) {
        tableCells = table.querySelectorAll('td.tictactoe-cell');
        tableCells.forEach(c => {
            c.addEventListener('click', async (event) => {
                const pos = Array.from(tableCells).findIndex(cell => cell === c);
                const response = await fetch(`/move?pos=${pos}`, { method: 'POST' });
                boardHtml = await response.text();
                document.dispatchEvent(new Event('gameStart'));
            });
        });
    }
    document.dispatchEvent(new Event('restartBtnLoaded'));
});
document.addEventListener('restartBtnLoaded', () => {
    document.querySelector('#restart').addEventListener('click', async (event) => {
        const response = await fetch(`/reload`, { method: 'POST' });
        boardHtml = await response.text();
        document.dispatchEvent(new Event('gameStart'));
    });
});