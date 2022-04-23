const Web3 = require("web3");
const ethNetwork = 'wss://kovan.infura.io/ws/v3/e8ad3a2916fe4374ada225427149c107';
const web3 = new Web3(new Web3.providers.WebsocketProvider(ethNetwork));


const ABI = [{
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "number",
        "type": "uint256"
    }],
    "name": "Addition",
    "type": "event"
}, {
    "inputs": [],
    "name": "a",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "addNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}];

const CONTRACT_ADDRESS = '0xcaf38e5f0f205eb619918cc6a34cfc08c194f9b8';
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

let options = {
    filter: {
        value: [],
    },
    fromBlock: 0
};

contract.events.Addition(options)
    .on('data', event => console.log(event))
    .on('changed', changed => console.log(changed))
    .on('error', err => console.log(err))
    .on('connected', str => console.log(str))