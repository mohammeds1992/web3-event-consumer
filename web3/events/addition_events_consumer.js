const db = require('../../models')
const Blocknumber = db.blocknumber
const Event = db.events
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.NODE_PROVIDER_URL));
const ABI = require("../../configuration/abis/additionABI")
const contract = new web3.eth.Contract(ABI.getAdditionContractABI(), process.env.ADDITION_SMART_CONTRACT_ADDRESS);
const logger = require('../../configuration/logger')

const getBlocknumber = async () => {
    let blocknumber = await Blocknumber.findOne({
        where: {
            eventType: 'Addition'
        }
    });
    return blocknumber == null ? 0 : blocknumber.toJSON()['currentBlocknumber'];
}

const eventHandler = async (data) => {

    logger.info("received the event with transactionHash :: " + data['transactionHash'])

    let event = await Event.findOne({
        where: {
            transactionHash: data['transactionHash']
        }
    });

    if (event == null) {

        await Event.create({
            event: data,
            eventType: 'Addition',
            transactionHash: data['transactionHash']
        });

        logger.info("saved the event with transactionHash :: " + data['transactionHash'])

        let currentBlocknumber = await getBlocknumber();

        if (data['blockNumber'] > currentBlocknumber) {
            await Blocknumber.upsert({
                eventType: 'Addition',
                currentBlocknumber: data['blockNumber']
            });
            logger.info("updated currentBlocknumber to :: " + data['blockNumber'])
        }

    } else {
        logger.info("already processed, hence skipping the event with transactionHash :: " + data['transactionHash'])
    }
}

exports.consume = async function() {
    let currentBlocknumber = await getBlocknumber();
    logger.info("Events consumption has started from the blocknumber :: " + currentBlocknumber)
    let options = {
        fromBlock: currentBlocknumber
    };

    contract.events.Addition(options)
        .on('data',
            event => {
                eventHandler(event, currentBlocknumber)
            }
        )
        .on('error', err => logger.error("Error while listening events " + err))
        .on('connected', str => logger.info("Connected to ethereum node provider!!!"))
}