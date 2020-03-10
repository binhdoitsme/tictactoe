const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/TicTacToeMVC', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB connection is up and running.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./GameRecord')