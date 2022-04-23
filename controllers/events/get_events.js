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

    if (isNaN(page) || page <= 0) {
        next(createError(400, 'page number should be a valid positive integer'));
    }

    if (isNaN(size) || size <= 0) {
        next(createError(400, 'page size should be a valid positive integer'));
    }

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
        next(createError(500, 'internal server'));
    }
}