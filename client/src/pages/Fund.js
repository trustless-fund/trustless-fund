import React, { Component } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import InvalidFund from '../components/InvalidFund';
import DepositForm from '../components/DepositForm';
import WithdrawForm from '../components/WithdrawForm';
import Assets from '../components/Assets';

import TrustlessFund from '../contracts/TrustlessFund.json';
import TrustlessFundFactory from '../contracts/TrustlessFundFactory.json';
// import ERC20 from '../contracts/ERC20.json';

const drizzleOptions = {
  contracts: [
    TrustlessFund,
    TrustlessFundFactory,
    // ERC20
  ], 
  events: {
    TrustlessFund: [
      'Deposit',
      'Withdraw', 
      'IncreaseTime', 
      'UpdateBeneficiary'
    ],
    TrustlessFundFactory: [
      'CreateFund'
    ],
    // ERC20: [
    //   'Transfer',
    //   'Approval'
    // ]
  }
}

const drizzle = new Drizzle(drizzleOptions);

class Fund extends Component {
  state = {
    invalidFund: false,
    renderWithdrawalForm: false
  }

  setFundAddress = async () => {
    const fundId = this.props.match.params.fundId;
    const fundAddress = await drizzle.contracts.TrustlessFundFactory.methods.getFund(fundId).call();
    drizzle.contracts.TrustlessFund.address = fundAddress;

    this.isInvalidFund(fundAddress);
  }

  isInvalidFund = (address) => {
    if(address === '0x0000000000000000000000000000000000000000') {
      this.setState({invalidFund: true});
    }
  }

  getExpiration = async () => {
    const expiration = await drizzle.contracts.TrustlessFund.methods.expiration().call();
    return expiration;
  }

  getBeneficiary = async () => {
    const beneficiary = await drizzle.contracts.TrustlessFund.methods.beneficiary().call();
    return beneficiary;
  }

  renderWithdrawalForm = async (state) => {
    const beneficiary = await this.getBeneficiary();
    const expiration = await this.getExpiration();
    const ts = Math.round((new Date()).getTime() / 1000);

    if(beneficiary === state.accounts[0] && expiration < ts) {
      this.setState({renderWithdrawalForm: true});
    }
  }

  render() {
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          {drizzleContext => {
            const {drizzle, drizzleState, initialized} = drizzleContext;

            if(!initialized) {
              return "Loading..."
            }

            this.setFundAddress();
            this.renderWithdrawalForm(drizzleState);

            if(this.state.invalidFund) {
              return (<InvalidFund />);
            }

            return(
              <div className="fund">
                <h1>Trust Fund</h1>
                <DepositForm drizzle={drizzle} drizzleState={drizzleState} />
                {this.state.renderWithdrawalForm &&
                  <WithdrawForm drizzle={drizzle} drizzleState={drizzleState} />
                }
                <Assets drizzle={drizzle} drizzleState={drizzleState} />
              </div>
            );
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    );
  }
}

export default Fund;
