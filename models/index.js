const dbConfig = require('../configuration/db.js');

const {Sequelize, DataTypes} = require('sequelize');


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

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.events = require('./event.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(async () => {
    console.log('yes re-sync done!')
})


module.exports = db