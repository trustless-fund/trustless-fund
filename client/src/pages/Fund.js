import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as accountsActions from '../actions/accountsActions';
import * as factoryActions from '../actions/factoryActions';

class Fund extends Component {
  state = {
    fund: null,
    account: this.props.accounts[0],
    factory: this.props.factory,
    error: false
  }

  componentDidMount = async () => {
    this.props.actions.loadAccounts();
    this.props.actions.loadFactory();

    window.ethereum.on('accountsChanged', (accounts) => {
      this.setState({account: accounts[0]});
    });

    const fundId = this.props.match.params.fundId;

    this.props.actions.loadFundAddress(fundId);
  }

  componentWillReceiveProps = (newProps) => {
    if(this.state.account !== newProps.accounts[0]) {
      this.setState({account: newProps.accounts[0]});
    }
    if(this.state.factory !== newProps.factory) {
      this.setState({factory: newProps.factory});
    }
  }

  // getFundAddress = async () => {
  //   await this.props.factory.methods.getFund(
  //     this.state.fundId
  //   ).call().then((res) => {
  //     this.setState({fundAddress: res});
  //   });

  //   if(this.state.fundAddress.toString() === '0x0000000000000000000000000000000000000000') {
  //     return this.setState({error: true});
  //   }

  //   const fund = new this.props.web3.eth.Contract(
  //     TrustlessFund.abi, this.state.fundAddress
  //   );
  //   this.setState({fund});
  // }

  // getFundExpiration = async () => {
  //   this.state.fund.methods.expiration().call((err, res) => {
  //     if(err) {
  //       console.log(err);
  //     } else {
  //       console.log(res);
  //     }
  //   });
  // }

  render() {
    console.log('fundAddress: ', this.state.factory.fundAddress);
    return (
      <div className="fund">
        <h1>Trust Fund</h1>
        {'Account: ' + this.state.account}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // console.log('map', state);
  return {
    accounts: state.accounts,
    factory: state.factory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...accountsActions, ...factoryActions}, dispatch)
  };
}

Fund.propTypes = {
  accounts: PropTypes.array.isRequired,
  factory: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Fund);
