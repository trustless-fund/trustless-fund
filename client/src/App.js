import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import TrustFundFactory from './contracts/TrustFundFactory.json';
import getWeb3 from "./getWeb3";

import Index from './pages/Index';
import Fund from './pages/Fund';

// import './layout/config/_base.sass';

class App extends Component {
  state = { 
    web3: null, 
    accounts: null,
    account: null,
    factory: null 
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
      const factory = new web3.eth.Contract(
        TrustFundFactory.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, factory });
    } catch (error) {
      console.error(error);
    }

    this.accountInterval = setInterval(async () => {
      const accounts = this.state.accounts;
      if (accounts[0] !== this.state.account) {
        this.setState({
          account: accounts[0]
        });
      }
    }, 1000);
  };

  render() {
    return (
      <div className="app">
        {this.state &&
          <Router basename="/">
            <Route 
              exact path="/" 
              component={Index} 
              {...this.state}
            />
            <Route 
              path="/fund/:fundId" 
              component={Fund}
              {...this.state} 
            />
          </Router>
        }
      </div>
    );
  }
}

export default App;
