exports.getAdditionContractABI = function () {
  return [{
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
};