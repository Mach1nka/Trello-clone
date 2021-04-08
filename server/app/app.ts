import express = require('express');
import mongoose = require('mongoose');
import KEYS = require('../config/keys');

const app = express();

mongoose
  .connect(KEYS.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

export = app;
