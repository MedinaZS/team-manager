const { Players } = require('../models/player.model');

//Create
module.exports.create = (req, res) => {
    Players.create(req.body)
        .then((player) => { console.log("Created succesfully"); res.json(player); })
        .catch((error) => {
            console.log("Something went wrong (create)", error);
            res.status(400).json(error)
        });
}

//Get All
module.exports.getAll = (req, res) => {
    // Add collation to sort insensitive, numeric ordering in case some name has numbers
    Players.find({})
        .then(Players => res.json(Players))
        .catch((error) => console.log("Something went wrong (getAll)", error));
}

//Get one
module.exports.getOne = (req, res) => {
    Players.findById(req.params.id)
        .then(player => res.json(player))
        .catch((error) => console.log("Something went wrong (getOne)", error));
}

//Update 
module.exports.update = (req, res) => {
    Players.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        .then(updatedSerie => res.json(updatedSerie))
        .catch((error) => {
            console.log("Something went wrong (update)", error);
            res.status(400).json(error)
        });
}

//Delete player
module.exports.delete = (req, res) => {
    Players.findByIdAndDelete(req.params.id)
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch((error) => console.log("Something went wrong (delete)", error));
}