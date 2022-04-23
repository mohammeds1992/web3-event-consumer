const db = require('../../models')
const Blocknumber = db.blocknumber
const Event = db.events
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.NODE_PROVIDER_URL));
const ABI = require("../../configuration/abis/additionABI")
const contract = new web3.eth.Contract(ABI.getAdditionContractABI(), process.env.ADDITION_SMART_CONTRACT_ADDRESS);

const getBlocknumber = async () => {
    let blocknumber = await Blocknumber.findOne({
        where: {
            eventType: 'Addition'
        }
    });
    return blocknumber == null ? 0 : blocknumber.toJSON()['currentBlockNumber'];
}

const eventHandler = async (data) => {

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
        })

        await Blocknumber.create({
            eventType: 'Addition',
            currentBlockNumber: data['blockNumber']
        })
    } else {
        console.log("skipping this event")
    }
}

exports.consume = async function() {
    let options = {
        fromBlock: await getBlocknumber()
    };
    contract.events.Addition(options)
        .on('data',
            event => {
                eventHandler(event)
                console.log(event);
            }
        )
        .on('changed', changed => console.log(changed))
        .on('error', err => console.log(err))
        .on('connected', str => console.log(str))
}