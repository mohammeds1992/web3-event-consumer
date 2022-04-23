const {
    createLogger,
    transports
} = require('winston')

const infoLogger = createLogger({
    transports: [
        new transports.File({
            filename: './logs/event_consumer.log',
            level: 'info'
        })
    ]
})

infoLogger.stream = {
    write: (message, encoding) => {
        infoLogger.info(message);
    }
}

module.exports = infoLogger;