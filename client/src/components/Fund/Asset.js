import React, {Component} from 'react';

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

  getToken = () => {
    if(this.props.token.address === '0x0000000000000000000000000000000000000000') {
      this.setState({token: 'ETH'});
    }
    // TODO: Else get token from etherscan api
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
          {this.state.balance}
          {/* TODO: Get USD value from etherscan api */}
        </p>
      </li>
    );
  }
}

export default Asset;