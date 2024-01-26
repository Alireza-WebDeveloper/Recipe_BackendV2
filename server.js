const utilsWorks = require('./utils/works');
const express = require('express');
const rootRouter = require('./router/root');
const morgan = require('morgan');
const dotenv = require('dotenv');
const categories = require('./router/categories');
const mongoose = require('mongoose');
const cors = require('cors');
const recipesRouter = require('./router/recipes');

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.MONGOATLAS_URL, {
    dbName: process.env.MONGO_ATLAS_DB,
    user: process.env.MONGO_ATLAS_USERNAME,
    pass: process.env.MONGO_ATLAS_PASSWORD,
    writeConcern: { w: 'majority' },
  })
  .then(() => {
    const app = express();
    app.use(express.static('public'));
    app.use(cors());
    app.use(express.json());

    // add routes
    app.use(morgan('dev'));
    app.use('/', rootRouter);
    app.use('/api/recipes', recipesRouter);
    app.use('/api/categories', categories);
    app.listen(
      process.env.PORT || 3000,
      process.env.HOST || 'localhost',
      () => {
        console.log('Server Start');
      }
    );
  })
  .catch((err) => {
    console.log(err);
  });
