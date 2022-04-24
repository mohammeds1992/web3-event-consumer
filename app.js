const express = require('express')
const middleware = require('./middlewares')
const createError = require('http-errors')
const routes = require('./routes')
const app = express();
const logger = require('./configuration/logger')

middleware(app)
routes(app)

app.use((req, res, next) => {
    res.redirect('http://' + process.env.HOST + '/v1/events')
})

app.use(
    (error, req, res, next) => {
        logger.error(error.message);
        res.statusCode = error.statusCode;
        res.json({
            message: error.message
        });
    });

module.exports = app;