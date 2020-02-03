const TictactoeController = require('./controllers/TictactoeController');
const express = require('express');
const handlebars = require('express-handlebars').create({ defaultLayout: null });
const app = express();
const APP_PORT = 8080;

// view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// middleware definitions
app.use(express.urlencoded({ extended: true })); // submit form data
app.use(express.json()); // submit json with fetch
app.use(express.static('public'));

/**
 * @type {TictactoeController}
 */
let ctrl;

/**
 * @param {number} activePlayerIndex 
 */
function buildActivePlayerArray(activePlayerIndex) {
    let activePlayers = new Array(2);
    activePlayers.fill(undefined);
    if (activePlayerIndex === 0) {
        activePlayers[0] = true;
    } else {
        activePlayers[1] = true;
    }
    return activePlayers;
}

/**
 * Render the gameplay
 * @param {Response} res 
 */
function renderGameplay(res) {
    res.render('ViewGameplay', {
        gameIndex: ctrl.gamesPlayed + 1,
        gameboard: ctrl.renderGame(),
        players: ctrl.playerNodes,
        activePlayerArray: buildActivePlayerArray(ctrl.activePlayer),
        winCounts: Array.from(ctrl.gameHistory.values())
    });
}

app.listen(APP_PORT, () => {
    console.log(`Listening on ${APP_PORT}!`);
});

app.get('/', (req, res) => {
    res.render('ViewStart', {
        layout: '../ViewMain'
    });
});

app.post('/gamestart', (req, res) => {
    ctrl = new TictactoeController(parseInt(req.body.size), req.body.playerData, req.body.playerRep);
    renderGameplay(res);
});

app.post('/reload', (req, res) => {
    ++ctrl.gamesPlayed;
    ctrl.reset();
    renderGameplay(res);
})

app.post('/move', (req, res) => {
    const val = ctrl.renderMove(req.query.pos);
    if (val !== undefined) {
        if (val === null) {
            res.render('ViewTie');
        } else {
            ctrl.gameHistory.set(val, ctrl.gameHistory.get(val) + 1);
            res.render('ViewWin', {
                wonPlayer: val
            });
        }
    } else {
        renderGameplay(res);
    }
});