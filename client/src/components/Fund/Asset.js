import React, {Component} from 'react';
import ERC20 from '../../contracts/ERC20.json';

class Asset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      balance: null
    }
  }

  componentDidMount = () => {
    this.getToken();
    this.getBalance();
  }

  // getLogo = () => {
  //   const logo = 
  // }

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
    this.setState({balance});
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
          {this.state.balance}
          {/* TODO: Get USD value from etherscan api */}
        </p>
      </li>
    );
  }
}

export default Asset;