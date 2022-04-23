const eventsRouter = require('./events')

module.exports = (app) => {
	app.use('/v1/events', eventsRouter);
};

