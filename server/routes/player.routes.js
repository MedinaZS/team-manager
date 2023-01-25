const PlayersController = require('../controllers/player.controller');

module.exports = function(app){
    app.get('/api/player/list' , PlayersController.getAll);
    app.post('/api/player/new' , PlayersController.create);
    app.get('/api/player/:id' , PlayersController.getOne);
    app.put('/api/player/edit/:id' , PlayersController.update);
    app.delete('/api/player/delete/:id' , PlayersController.delete);
}