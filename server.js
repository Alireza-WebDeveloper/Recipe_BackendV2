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

const app = express();
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use(express.json());

// add routes
app.use(morgan('dev'));
app.use('/', rootRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/categories', categories);

mongoose
  .connect(process.env.MONGOATLAS_URL, {
    dbName: process.env.MONGO_ATLAS_DB,
    user: process.env.MONGO_ATLAS_USERNAME,
    pass: process.env.MONGO_ATLAS_PASSWORD,
    writeConcern: { w: 'majority' },
  })
  .then(() => {
    console.log('MongoDb Connect');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 3000, process.env.HOST || 'localhost', () => {
  console.log('Server Start');
});
