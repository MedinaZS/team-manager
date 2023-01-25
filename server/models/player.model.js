const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [2, "Name must be at least 2 characters in length"]
    },
    preferredPosition: {
        type: String
    },
    statusGame: {
        type: [String],
        default: ['undecided', 'undecided', 'undecided']
    }
}, { timestamps: true });

module.exports.Players = mongoose.model("Players", PlayerSchema); 

