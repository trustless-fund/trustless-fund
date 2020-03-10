import React, { Component } from "react";
import TrustFundFactory from './contracts/TrustFundFactory.json';
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { 
    web3: null, 
    accounts: null, 
    contract: null 
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TrustFundFactory.networks[networkId];
      const instance = new web3.eth.Contract(
        TrustFundFactory.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Trust Fund</h1>
      </div>
    );
  }
}

export default App;
