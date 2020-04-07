import React, {Component} from 'react';
import ERC20 from '../../contracts/ERC20.json';

class Asset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      balance: null,
      usdValue: 0
    }
  }

  componentDidMount = () => {
    this.getToken();
    this.getBalance();
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
    if(this.props.token.address === '0x0000000000000000000000000000000000000000') {
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then((res) => {
          return res.json();
        }).then((res) => {
          const usdValue = (res.ethereum.usd * this.state.balance).toFixed(2);
          this.setState({usdValue});
        });
    } else {
      fetch(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${this.props.token.address}&vs_currencies=usd`)
        .then((res) => {
          return res.json();
        }).then((res) => {
          if(this.isEmpty(res)) {
            return;
          }
          const usdValue = (res[this.props.token.address].usd * this.state.balance).toFixed();
          this.setState({usdValue});
        });
    }
  }

  getToken = async () => {
    if(this.props.token.address === '0x0000000000000000000000000000000000000000') {
      this.setState({token: 'ETH'});
    } else {
      const token = await new this.props.drizzle.web3.eth.Contract(
        ERC20, this.props.token.address
      );
      const symbol = await token.methods.symbol().call();
      this.setState({token: symbol});
    }
  }

  getBalance = () => {
    const balance = this.props.drizzle.web3.utils.fromWei(
      this.props.token.balance);

    let fixedBalance;  
    if(balance < 0.001) {
      fixedBalance = '<0.001';
    } else {
      fixedBalance = parseInt(balance).toFixed(3);
    }
    this.setState({balance: fixedBalance});
  }

  render() {
    return (
      <li className="assets__asset">
        <p className="assets__asset-info">
          {/* TODO: Get logo from etherscan api */}
          {this.state.token}
        </p>
        <p className="assets__asset-info assets__asset-info--amount">
          {/* TODO: If balance < 0.0001, return <0.0001 */}
          {this.state.balance}/{`$${this.state.usdValue}`}
          {/* TODO: Get USD value from etherscan api */}
        </p>
      </li>
    );
  }
}

export default Asset;