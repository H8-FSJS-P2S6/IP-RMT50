require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(routes);
app.use(errorHandler);

module.exports = app;