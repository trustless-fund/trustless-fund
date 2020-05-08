import React, { Component } from "react";
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import keys from '../keys';

import FundContainer from '../components/Fund/FundContainer';
import Nav from '../components/Shared/Nav';
import Footer from '../components/Shared/Footer';
import '../layout/components/loading.sass';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_INFURA : keys.infura
    }
  }
}

function initWeb3(provider) {
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: 'chainId',
        call: 'eth_chainId',
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });

  return web3;
}

class Fund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      provider: null,
      connected: null,
      address: null,
      chainId: null,
      networkId: null
    }

    this.web3modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions
    });

    if (this.web3modal.cachedProvider) {
      this.onConnect()
    }
  } 

  onConnect = async () => {
    try {
      const provider = await this.web3modal.connect();
      await this.subscribeProvider(provider);
      const web3 = initWeb3(provider);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const networkId = await web3.eth.net.getId();
      const chainId = await web3.eth.chainId();

      await this.setState({
        web3,
        provider,
        connected: true,
        address,
        chainId,
        networkId
      });
    } catch {
      console.log('No web3 provider');
    }
  }

  subscribeProvider = async (provider) => {
    provider.on('close', () => this.disconnect());

    provider.on('accountsChanged', async (accounts) => {
      await this.setState({ address: accounts[0] });
    });

    provider.on('chainChanged', async (chainId) => {
      const { web3 } = this.state
      const networkId = await web3.eth.net.getId()
      await this.setState({ chainId, networkId });
    });

    provider.on('networkChanged', async (networkId) => {
      const { web3 } = this.state;
      const chainId = await web3.eth.chainId();
      await this.setState({ chainId, networkId });
    });
  }

  disconnect = async () => {
    const { web3 } = this.state
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close()
    }
    await this.web3modal.clearCachedProvider();
    this.setState({connected: false, address: null});
  }

  render() {
    return(
      <>
        <Nav 
          web3={this.state.web3}
          address={this.state.address}
          networkId={this.state.networkId}
          onConnect={this.onConnect}
          disconnect={this.disconnect}
          connected={this.state.connected} />
        <FundContainer 
          web3={this.state.web3}
          fundId={this.props.match.params.fundId}
          version={this.props.match.params.version}
          networkId={this.state.networkId}
          address={this.state.address} />
        <Footer />
      </>
    );    
  }
}

export default Fund;
