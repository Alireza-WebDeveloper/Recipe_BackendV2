const Router = require("express").Router();
const model = require('../db/models/Recipe');
const {baseResponse} = require("../utils/functions");
const {resultCode} = require('../utils/works');


Router.get('/', async (req, res) => {
    const rr = new RegExp(`.*${req.query.q || ''}.*`);
    let data = await model.find({
        name: rr
    }).limit(req.query.limit || 500);

    let result = [];
    if (req.query.categories) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].categories.includes(req.query.categories)) {
                result.push(data[i]);
            }
        }
    } else {
        result = data;
    }

    return baseResponse(res, true, result);
});

Router.get('/:id', async (req, res) => {
    let result = await model.findById(req.params.id);

    if (!result) {
        return baseResponse(res, false, {}, resultCode.NotFounded, 404)
    }

    return baseResponse(res, true, result);
});

module.exports = Router;