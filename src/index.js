const express = require('express');
const morgan = require('morgan');
const user = require('./api/user');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/users', user);

app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});

module.exports = app;
