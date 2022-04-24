const morgan = require('morgan')
const logger = require('../configuration/logger')

module.exports = (app) => {
    app.use(morgan('combined', {
        stream: logger.stream
    }));
};