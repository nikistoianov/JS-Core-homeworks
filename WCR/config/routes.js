const userController = require('./../controllers/user');
const homeController = require('./../controllers/home');
const articleController = require('./../controllers/article');
const gameController = require('./../controllers/game');

module.exports = (app) => {
    app.get('/', homeController.index);

    app.get('/rounds/:id', gameController.roundGet);

    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);

    app.get('/user/logout', userController.logout);

    app.get('/game/create', gameController.newMatchGet);
    app.post('/game/create', gameController.newMatchPost);

    app.get('/bet/:id', gameController.betGet);
    app.post('/game/bet/:id', gameController.betPost);

    app.get('/newbet/:id', gameController.newbetGet);
    app.post('/game/newbet/:id', gameController.newbetPost);
};

