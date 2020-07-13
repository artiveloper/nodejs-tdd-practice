const express = require('express');
const morgan = require('morgan');
const user = require('./api/user');

const app = express();

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use('/users', user);

module.exports = app;
