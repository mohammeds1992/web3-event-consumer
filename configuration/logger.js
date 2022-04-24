const {
    createLogger,
    transports
} = require('winston')

const infoLogger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            filename: './logs/event_consumer.log',
            level: 'info',
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
        })
    ]
})

infoLogger.stream = {
    write: (message, encoding) => {
        infoLogger.info(message);
    }
}

module.exports = infoLogger;