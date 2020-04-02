import React, {Component} from 'react';
import InvalidFund from './InvalidFund';
import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';
import Assets from './Assets';
import Expiration from './Expiration';
import Details from './Details';

import '../../layout/components/fund.sass';

class FundContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidFund: false
    }

    this.setFundAddress();
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

  render() {
    if(this.state.invalidFund) {
      return (<InvalidFund />);
    }

    return (
      <div className="fund">
        <Expiration drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
        <Assets drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
        <DepositForm drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
        <WithdrawForm drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
        <Details drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
      </div>
    );
  }
}

export default FundContainer;