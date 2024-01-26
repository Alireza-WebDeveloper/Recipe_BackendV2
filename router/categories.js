const Router = require("express").Router();
const {baseResponse} = require("../utils/functions");
const {resultCode} = require('../utils/works');
const model = require('../db/models/Recipe');

Router.get('/', async (req, res) => {
    let data = await model.find({});
    let result = [];
    data.forEach((val) => {
        val.categories.forEach((nval) => {
            if (!result.includes(nval)) {
                result.push(nval);
            }
        });
    });
    result.unshift('تمامی');
    return baseResponse(res, true, result);
});

module.exports = Router;
