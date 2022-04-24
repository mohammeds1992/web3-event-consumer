const dbConfig = require('../configuration/db.js');
const logger = require('../configuration/logger')

const {
    Sequelize,
    DataTypes
} = require('sequelize');

const Event = require('./event')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.options.logging = false

sequelize.authenticate()
    .then(() => {
        logger.info('DB connection initialized.')
    })
    .catch(err => {
        logger.info('DB connection initialized failed' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.events = require('./event.js')(sequelize, DataTypes)
db.blocknumber = require('./blocknumber.js')(sequelize, DataTypes)

db.sequelize.sync({
        force: false
    })
    .then(async () => {
        logger.info('No DB resync done.')
    })


module.exports = db