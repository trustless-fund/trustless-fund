import React, {Component} from 'react';
import ENS from 'ethereum-ens';
import namehash from 'eth-ens-namehash';
import ENSResolver from '../../contracts/ENSResolver.json';
import ENSRegistry from '../../contracts/ENSRegistry.json';

import logo from '../../assets/logo.png';

import '../../layout/components/nav.sass';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      noProvider: false,
      testNetwork: false,
      ENSName: null,
      registry: null,
      avatar: null
    }

    if(window.ethereum) {
      this.state.address = this.props.address;

      window.ethereum.on('accountsChanged', (accounts) => {
        this.setState({address: accounts[0]});
      });
    }
  }

  componentDidMount = async () => {
    try {
      if(!this.props.web3.givenProvider) {
        this.setState({address: null});
        this.setState({noProvider: true});
      } else {
        await this.setState({address: this.props.address});
        this.setState({noProvider: false});
        this.ens = await new ENS(this.props.web3);
        await this.getENSContracts();
        this.getENSName();
      }
      if(this.props.networkId !== 1) {
        this.setState({testNetwork: true});
      } else {
        this.setState({testNetwork: false})
      }
    } catch {
      this.setState({address: null});
      this.setState({noProvider: true});
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

  getENSContracts = () => {
    const registry = new this.props.web3.eth.Contract(ENSRegistry, '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e');
    this.setState({registry});
  }

  getENSName = async () => {
    try {
      let name = await this.ens.reverse(this.state.address).name();
      if(this.state.address !== await this.ens.resolver(name).addr()) {
        name = null;
      } else {
        this.setState({ENSName: name});
        const normalizedName = await namehash.normalize(name);
        const hashedName = await namehash.hash(normalizedName);
        const resolverAddress = await this.state.registry.methods.resolver(hashedName).call();
        const resolver = await new this.props.web3.eth.Contract(ENSResolver, resolverAddress);
        const avatar = await resolver.methods.text(hashedName, 'avatar').call();
        if(avatar) {
          this.setState({avatar});
        }
      } 
    } catch {
      
    }
  }

  render() {
    if(this.state.testNetwork) {
      return (
        <nav className="nav-error">
          <p className="nav-error__error">
            Note: You are currently connected to the {this.getNetwork(this.props.networkId)} testnet.
          </p>
          <div className="nav-error__content">
            <a href="/" className="nav__header">
              <img src={logo} alt="Trustless Fund" className="nav__logo" />
              Trustless Fund
            </a>
            <button className="nav__button">
              {this.state.ENSName ? `${this.state.ENSName}` :
                this.state.address ? 
                  `${this.state.address.slice(0, 4)}...${this.state.address.slice(this.state.address.length - 4, this.state.address.length)}` : 
                  'Connect Wallet'}
              {this.state.avatar &&
                <img src={this.state.avatar} alt="ENS Avatar" className="nav__avatar" />}
            </button>
          </div>
        </nav>
      );
    }

    if(this.state.noProvider) {
      return (
        <nav className="nav-error">
          <p className="nav-error__error">
            No web3 detected. Please download and connect to Metamask.
          </p>
          <div className="nav-error__content">
            <a href="/" className="nav__header">
              <img src={logo} alt="Trustless Fund" className="nav__logo" />
              Trustless Fund
            </a>
            <button className="nav__button">
              {this.state.ENSName ? `${this.state.ENSName}` :
                  this.state.address ? 
                    `${this.state.address.slice(0, 4)}...${this.state.address.slice(this.state.address.length - 4, this.state.address.length)}` : 
                    'Connect Wallet'}
              {this.state.avatar &&
                <img src={this.state.avatar} alt="ENS Avatar" className="nav__avatar" />}
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
          {this.state.ENSName ? `${this.state.ENSName}` :
            this.state.address ? 
              `${this.state.address.slice(0, 4)}...${this.state.address.slice(this.state.address.length - 4, this.state.address.length)}` : 
              'Connect Wallet'}
          {this.state.avatar &&
            <img src={this.state.avatar} alt="ENS Avatar" className="nav__avatar" />}
        </button>
      </nav>
    );
  }
}

export default Nav;