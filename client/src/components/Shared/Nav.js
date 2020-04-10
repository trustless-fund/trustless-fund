import React, {Component} from 'react';

import logo from '../../assets/logo.png';

import '../../layout/components/nav.sass';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.drizzleState.accounts[0],
      noProvider: false,
      testNetwork: false
    }

    if(window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        this.props.drizzle.store.dispatch({type: 'ACCOUNTS_FETCHED', accounts});
      });
    }
  }

  componentDidMount = () => {
    if(!this.props.drizzle.web3.givenProvider) {
      this.setState({address: null});
      this.setState({noProvider: true});
    } else {
      this.setState({address: this.props.drizzleState.accounts[0]});
      this.setState({noProvider: false});
    }
    if(this.props.drizzleState.web3.networkId !== 1) {
      this.setState({testNetwork: true});
    } else {
      this.setState({testNetwork: false})
    }
  }

  getNetwork = (id) => {
    const networks = {
      1: 'Mainnet',
      3: 'Ropsten',
      4: 'Rinkeby',
      5: 'Goerli',
      42: 'Kovan'
    }

    return networks[id];
  }

  render() {
    if(this.state.testNetwork) {
      return (
        <nav className="nav-error">
          <p className="nav-error__error">
            Note: You are currently connected to the {this.getNetwork(this.props.drizzleState.web3.networkId)} testnet.
          </p>
          <div className="nav-error__content">
            <a href="/" className="nav__header">
              <img src={logo} alt="Trustless Fund" className="nav__logo" />
              Trustless Fund
            </a>
            <button className="nav__button">
              {this.state.address ? 
                `${this.state.address.slice(0, 4)}...${this.state.address.slice(this.state.address.length - 4, this.state.address.length)}` : 
                'Connect Wallet'}
            </button>
          </div>
        </nav>
      );
    }

    if(this.state.noProvider) {
      return (
        <nav className="nav-error">
          <p className="nav-error__error">
            No web3 detected. Please download and connect to 
            <a 
              href="https://metamask.io/"
              className="nav-error__link"
              target="_blank"
              rel="noopener noreferrer">
              Metamask.
            </a>
          </p>
          <div className="nav-error__content">
            <a href="/" className="nav__header">
              <img src={logo} alt="Trustless Fund" className="nav__logo" />
              Trustless Fund
            </a>
            <button className="nav__button">
              {this.state.address ? 
                `${this.state.address.slice(0, 4)}...${this.state.address.slice(this.state.address.length - 4, this.state.address.length)}` : 
                'Connect Wallet'}
            </button>
          </div>
        </nav>
      );
    }

    return (
      <nav className="nav">
        <a href="/" className="nav__header">
          <img src={logo} alt="Trustless Fund" className="nav__logo" />
          Trustless Fund
        </a>
        <button className="nav__button">
          {this.state.address ? 
            `${this.state.address.slice(0, 4)}...${this.state.address.slice(this.state.address.length - 4, this.state.address.length)}` : 
            'Connect Wallet'}
        </button>
      </nav>
    );
  }
}

export default Nav;