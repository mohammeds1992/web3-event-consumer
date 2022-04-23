const logger = require('../../configuration/logger')
const db = require('../../models')
const createError = require('http-errors')
const Event = db.events

module.exports.getEvents = async (req, res, next) => {

    let {
        page,
        size
    } = req.query;


    if (!page) {
        page = 1;
    }

    if (!size) {
        size = 10;
    }

    if (isNaN(page)) {
        next(createError(400));
    }

    if (isNaN(size)) {
        next(createError(400));
    }

    /*for(let i = 0; i < 25; i++) {
        const event = {
            event: {"key1": "value1", "key2": "value2"}
        }
        await Event.create(event)
    }*/
    try {
        let events = await Event.findAndCountAll({
            offset: parseInt((page - 1) * size),
            limit: parseInt(size),
            order: [
                ['id', 'DESC']
            ]
        });
        res.status(200).send(events)
    } catch (err) {
        next(createError(500));
    }

}