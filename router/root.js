const Router = require("express").Router();
const wrapMiddleware = require('../middlewares/wrapMidlleware');
const userValidator = require('../middlewares/validators/userValidator')


Router.get('/', (req, res) => {
    res.send('run');
});

module.exports = Router;
