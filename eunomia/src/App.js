import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import eunomia from './utils/Eunomia.json';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0x7260f117D9f57A7109df7383182B9d056bbf7960";

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
        
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  const dump = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const EunomiaContract = new ethers.Contract(contractAddress, eunomia.abi, signer);

        let count = await EunomiaContract.get_dump();
        console.log("Retrieved total dump count...", count.toNumber());

        const weight = document.getElementById("weight_input").value;
        const type = document.getElementById("type_input").value;


        const dumpTxn = await EunomiaContract.send_eth(type, weight, { gasLimit: 300000 });
        console.log("Mining...", dumpTxn.hash);

        await dumpTxn.wait();
        console.log("Mined -- ", dumpTxn.hash);

        count = await EunomiaContract.get_dump();
        console.log("Retrieved total dump count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        Welcome to Eunomia 
        </div>

        <div className="bio">
        Types of trash:
          1. Polyethene bags
          2. Paper (with plastic coating)
          3. Bottles/Food containers
          4. Metal artefacts
        </div>

        <label for="type_input">Enter the type of your trash - refer above: </label>
        <input type="number" id = "type_input" name = "type_input" /> 

        <label for="weight_input">Enter the weight of your trash in grams: </label>
        <input type="number" id = "weight_input" name = "weight_input" /> 

        <button className="waveButton" onClick={dump}>
          Submit
        </button>

        
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

      </div>
    </div>
  );
}

export default App