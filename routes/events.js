const {Router} = require('express')
const { getEvents } = require('../controllers/events/get_events')
const router = Router();

router.get('/', getEvents);

module.exports = router;