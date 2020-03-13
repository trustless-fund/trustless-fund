import React, { Component } from "react";

import TrustFund from '../contracts/TrustFund.json';

class Fund extends Component {
  state = {
    fundId: null,
    fundAddress: null,
    fund: null
  }

  componentDidMount = () => {
    // const fundId = this.props.match.params.fundId;
    // this.setState({fundId});

    console.log(this.props);

    // this.getFundAddress();
  }

  getFundAddress = async () => {
    await this.props.factory.methods.getFund(
      this.state.fundId
    ).call().then((res) => {
      this.setState({fundAddress: res});
    });

    if(this.state.fundAddress.toString() === '0x0000000000000000000000000000000000000000') {
      return this.setState({error: true});
    }

    const fund = new this.props.web3.eth.Contract(
      TrustFund.abi, this.state.fundAddress
    );
    this.setState({fund});
  }

  getFundExpiration = async () => {
    this.state.fund.methods.expiration().call((err, res) => {
      if(err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }

  render() {
    return (
      <div className="fund">
        <h1>Trust Fund</h1>
      </div>
    );
  }
}

export default Fund;
