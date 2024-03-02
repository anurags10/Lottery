import web3 from './web3';

const address = "Your Contract Deployed address";

const abi = 'your contract ABI here';

// this creates the instance of your contract which was deployed on blockchain so that we can use it with react.

export default new web3.eth.Contract(abi,address);  //creating an instance of the deployed smart contract

