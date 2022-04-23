require('dotenv').config();
const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const eventsListener = require('./web3/events/addition_events_consumer')

server.listen(process.env.PORT, () => {
    console.log("Web3 event consumer is ready!!!!")
});

eventsListener.consume()