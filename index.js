require('dotenv').config();
require('./db');
const express = require('express');
const app = express();

const { tourRouter } = require('./routes/tourRoute');

app.use(express.json());

app.use('/tour', tourRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('running');
});
