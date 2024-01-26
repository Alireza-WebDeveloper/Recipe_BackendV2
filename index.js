const utilsWorks = require('./utils/works');
const express = require('express');
const rootRouter = require('./router/root');
const categories = require('./router/categories');
const mongoose = require('mongoose');
const cors = require('cors')
const recipesRouter = require('./router/recipes');

mongoose.connect("mongodb://127.0.0.1:27017/rApp")
    .then(() => {
        const app = express();
        app.use(express.static('public'))
        app.use(cors())
        app.use(express.json());

        // add routes
        app.use('/', rootRouter);
        app.use('/api/recipes', recipesRouter)
        app.use('/api/categories', categories);
        app.listen(process.env.PORT || 3000, process.env.HOST || 'localhost', () => {
            console.log('Server Start');
        });
    })
    .catch(err => {
        console.log(err)
    })
