import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import { useState, useEffect } from 'react';


function App() {
 
  const [state, setState] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [value, setValue  ] = useState("0");
  const [msg, setMsg] = useState('');

  useEffect (() => {
    async function fetchData() {
      const manager = await lottery.methods.manager().call();
      const player = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
      setState({manager});
      setPlayers({player});
      setBalance({balance});
    }

    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    setMsg('Waiting for transaction to complete. Please wait for 20 seconds.')

    await lottery.methods.enter().send({
      from: accounts[0],
      value:  web3.utils.toWei(value,"ether")
    });

    setMsg('Thank you for your patience. You have been entered. Good Luck!')

  }

  async function handleClick() {
    const accounts = await  web3.eth.getAccounts();
    setMsg('Waiting for transaction to complete. Please wait for 20 seconds.')
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    setMsg('Winner has been picked')
    
  }

  return (
    <div>
      <h1>Lottery  Contract</h1>
      <p>
        This contract is managed by: {state}. 
        There are currently {players.length} players registered and they are competing to win {web3.utils.fromWei(balance,'ether')} ether!!
      </p>
      <hr />
      <form onSubmit = {handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
        <label>Enter amount of Ether to play with:</label>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
         />
         <button>Enter</button>
        </div>
        
      </form>
      <hr />
      <h4>It's time to pick a winner!!</h4>
      <button onClick={handleClick}>Pick Winner</button>
      <hr />
      <h2>{msg}</h2>
    </div>
  );
}

export default App;
