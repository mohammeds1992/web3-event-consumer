const express = require('express')
const middleware = require('./middlewares')
const createError = require('http-errors')
const routes = require('./routes')
const app = express();
const logger = require('./configuration/logger')

middleware(app)
routes(app)

app.use((req, res, next) => {
    let url = 'http://' + process.env.HOST + '/v1/events'
    res.setHeader("Content-Type", "text/html")
    res.send(`
             <html>
                <body>
                    <h1>Please click on this <a href=${url}>link</a> to fetch events.
                    </h1>
                </body>
            </html>
            `)
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