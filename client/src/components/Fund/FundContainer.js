import React, {Component} from 'react';
import InvalidFund from './InvalidFund';
import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';
import Assets from './Assets';
import Expiration from './Expiration';
import Details from './Details';
import Button from '../Shared/Button';

import '../../layout/components/fund.sass';

class FundContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidFund: false,
      renderWithdrawal: false,
      depositModal: false,
      withdrawalModal: false
    }

    this.setFundAddress();
    this.renderWithdrawal();
  }

  setFundAddress = async () => {
    const fundAddress = 
      await this.props.drizzle.contracts.TrustlessFundFactory.methods.getFund(this.props.fundId).call();
    this.props.drizzle.contracts.TrustlessFund.address = fundAddress;

    this.isInvalidFund(fundAddress);
  }

  isInvalidFund = (address) => {
    if(address === '0x0000000000000000000000000000000000000000') {
      this.setState({invalidFund: true});
    }
  }

  getExpiration = async () => {
    const expiration = await this.props.drizzle.contracts.TrustlessFund.methods.expiration().call();
    return expiration;
  }

  getBeneficiary = async () => {
    const beneficiary = await this.props.drizzle.contracts.TrustlessFund.methods.beneficiary().call();
    return beneficiary;
  }

  renderWithdrawal = async () => {
    const beneficiary = await this.getBeneficiary();
    const expiration = await this.getExpiration();
    const ts = Math.round((new Date()).getTime() / 1000);

    if(beneficiary === this.props.drizzleState.accounts[0] && expiration < ts) {
      this.setState({renderWithdrawal: true});
    }
  }

  renderDepositModal = () => {
    console.log('renderDepositModal')
    this.setState({depositModal: true});
  }

  renderWithdrawalModal = () => {
    console.log('renderWithdrawalModal')
    this.setState({withdrawalModal: true});
  }

  render() {
    if(this.state.invalidFund) {
      return (<InvalidFund />);
    }

    return (
      <div className="fund">
        <Expiration drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
        <Assets drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
        <div className="fund__buttons">
          <div onClick={this.renderDepositModal}>
            <Button 
              text="Deposit" 
              class="solid fund__button" 
              link={null} 
              button={true}
            />
          </div>
          {this.state.renderWithdrawal &&
            <div onClick={this.renderWithdrawalModal}>
              <Button text="Withdraw" class="outline fund__button" link={null} button={true} />
            </div>
          }
        </div>
        {this.state.depositModal &&
          <DepositForm drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
        }
        {this.state.withdrawalModal &&
          <WithdrawForm drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
        }
        <Details drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
      </div>
    );
  }
}

export default FundContainer;