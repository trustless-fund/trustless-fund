import React, {Component} from 'react';
import ERC20 from '../../contracts/ERC20.json';

class Asset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      balance: null,
      usdValue: 0,
      symbol: null,
      logo: null
    }
  }

  componentDidMount = () => {
    this.getSymbol();
    this.getBalance();
    this.getUsdValue();
    this.getLogo();
  }

  componentWillReceiveProps = async (nextProps) => {
    await this.setState({token: nextProps.token});
    await this.getBalance();
    this.getUsdValue();
  }

  // Source: https://stackoverflow.com/a/32108184/13171993
  isEmpty = (obj) => {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }

  getUsdValue = async () => {
    if(this.state.token.address === '0x0000000000000000000000000000000000000000') {
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then((res) => {
          return res.json();
        }).then((res) => {
          const usdValue = (res.ethereum.usd * this.state.balance).toFixed(2);
          this.setState({usdValue});
        });
    } else {
      fetch(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${this.state.token.address}&vs_currencies=usd`)
        .then((res) => {
          return res.json();
        }).then((res) => {
          if(this.isEmpty(res)) {
            return;
          }
          const usdValue = (res[this.state.token.address].usd * this.state.balance).toFixed();
          this.setState({usdValue});
        });
    }
  }

  getSymbol = async () => {
    if(this.state.token.address === '0x0000000000000000000000000000000000000000') {
      this.setState({symbol: 'ETH'});
    } else {
      const token = await new this.props.drizzle.web3.eth.Contract(
        ERC20, this.state.token.address
      );
      const symbol = await token.methods.symbol().call();
      this.setState({symbol});
    }
  }

  getDecimals = async () => {
    if(this.state.token.address !== '0x0000000000000000000000000000000000000000') {
      const token = await new this.props.drizzle.web3.eth.Contract(
        ERC20, this.state.token.address
      );
      const decimals = await token.methods.decimals().call();
      return decimals;
    }
  }

  fromWeiDecimals = (amount, decimals) => {
    const finalAmount = amount/10**decimals;
    return finalAmount;
  }

  getBalance = async () => {
    const decimals = await this.getDecimals();
    let balance;

    if(decimals && decimals !== '18') {
      balance = this.fromWeiDecimals(this.state.token.balance, decimals);
    } else {
      balance = this.props.drizzle.web3.utils.fromWei(this.state.token.balance);
    }

    let fixedBalance;  
    if(balance < 0.001) {
      fixedBalance = '<0.001';
    } else {
      fixedBalance = Math.round((parseFloat(balance) + Number.EPSILON) * 1000) / 1000;
    }

    this.setState({balance: fixedBalance});
  }

  getLogo = () => {
    let logo;
    if(this.state.token.address === '0x0000000000000000000000000000000000000000') {
      logo = 'https://cdn.iconscout.com/icon/free/png-256/ethereum-3-569581.png';
    } else {
      logo = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${this.state.token.address}/logo.png`
    }
    this.setState({logo});
  }

  handleLogoError = () => {
    this.setState({logo: 'https://assets-global.website-files.com/5cb0ac9c57054973ac1bf1e4/5cd059557473d12c2ea50768_2165.png'});
  }

  render() {
    return (
      <li className="assets__asset">
        <img 
          // TODO: Replace address with this.state.token.address
          // TODO: Get eth logo if zero address
          src={this.state.logo} 
          alt="Logo"
          className="assets__asset-logo"
          onError={this.handleLogoError} />
        <p className="assets__asset-info">
          {this.state.symbol}
        </p>
        <p className="assets__asset-info assets__asset-info--amount">
          {this.state.balance}/{`$${this.state.usdValue}`}
        </p>
      </li>
    );
  }
}

export default Asset;