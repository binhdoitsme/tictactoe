const mongoose = require('mongoose');


const Schema = mongoose.Schema
var GameRecordSchema = new Schema({
    
    playerOneName: {
    	type: String, 
    	min: 1,
    	required: [true, "missing playerOneName"]
    },
    playerOneRep: {
        type: String,
        min: 1,
        max: 1,
        required: [true, "missing playerOneRep"]
    },
    playerTwoName: {
        type: String, 
        min: 1,
        required: [true, "missing playerTwoName"]
        
    },
    playerTwoRep: {
        type: String,
        min: 1,
        max: 1, 
        required: [true, "missing playerTwoRep"]
    },
    boardSize: {
        type: Number,
        min: 1,
        required: [true, "missing boardSize"]
    },
    winner: {
        type: String,
        min: 1
    }
})

mongoose.model('GameRecord', GameRecordSchema);

