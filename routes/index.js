const eventsRouter = require('./events')

module.exports = (app) => {
	app.use('/events', eventsRouter);
};