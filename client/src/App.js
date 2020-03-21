import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import TrustlessFund from './contracts/TrustlessFund.json';
import getWeb3 from "./getWeb3";

import Index from './pages/Index';
import Fund from './pages/Fund';

// import './layout/config/_base.sass';

class App extends Component {
  state = { 
    web3: null, 
    accounts: null,
    account: null,
    fund: null,
    depositAmount: '',
    depositToken: ''
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TrustlessFund.networks[networkId];
      const fund = new web3.eth.Contract(
        TrustlessFund.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, fund });
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

  handleDepositAmountChange = (e) => {
    this.setState({depositAmount: e.target.value});
  }

  handleDepositTokenChange = (e) => {
    this.setState({depositToken: e.target.value});
  }

  handleDepositSubmit = (e) => {
    e.preventDefault();

    this.state.fund.methods.deposit(
      this.state.depositAmount,
      this.state.depositToken
    ).send({from: this.state.account});

    this.setState({depositAmount: '', depositToken: ''});
  }

  render() {
    return (
      <div className="app">
        {/* TODO: Work on routing later */}

        {/* {this.state.factory &&
          <Router basename="/">
            <Route 
              exact path="/" 
              component={Index}
            />
            <Route 
              path="/fund/:fundId" 
              component={Fund}
            />
          </Router>
        } */}

        <h1>Trust Fund</h1>

        {/* Approve Token */}
        
        {/* Token Allowance */}

        {/* Deposit */}

        <h2>Deposit</h2>
        <form
          onSubmit={this.handleDepositSubmit}
        >
          <input
            type="number"
            value={this.state.depositAmount}
            placeholder="amount"
            onChange={this.handleDepositAmountChange}
          />
          <input
            type="text"
            value={this.state.depositToken}
            placeholder="token"
            onChange={this.handleDepositTokenChange}
          />
          <button>
            Submit
          </button>
        </form>

        {/* Withdraw */}

      </div>
    );
  }
}

export default App;
