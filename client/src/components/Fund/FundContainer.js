import React, {Component} from 'react';
import InvalidFund from './InvalidFund';
import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';
import Assets from './Assets';
import Expiration from './Expiration';
import Details from './Details';
import Button from '../Shared/Button';
import Message from '../Shared/Message';
import TrustlessFund from '../../contracts/TrustlessFund.json';

import '../../layout/components/fund.sass';

class FundContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidFund: false,
      renderWithdrawal: false,
      depositModal: false,
      withdrawalModal: false,
      fund: null,
      message: null,
      txHash: null
    }

    this.getFund();
  }

  componentDidUpdate = () => {
    this.renderWithdrawal();
  }

  getFund = async () => {
    const fundAddress = 
      await this.props.drizzle.contracts.TrustlessFundFactory.methods.getFund(this.props.fundId).call();

    const fund = await new this.props.drizzle.web3.eth.Contract(
      TrustlessFund.abi,
      fundAddress
    );

    this.setState({fund});

    this.isInvalidFund(fundAddress);
  }

  isInvalidFund = (address) => {
    if(address === '0x0000000000000000000000000000000000000000') {
      this.setState({invalidFund: true});
    }
  }

  getExpiration = async () => {
    const expiration = await this.state.fund.methods.expiration().call();
    return expiration;
  }

  getBeneficiary = async () => {
    const beneficiary = await this.state.fund.methods.beneficiary().call();
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
    this.setState({depositModal: true});
  }

  closeDepositModal = (e) => {
    const depositBackground = document.querySelector('.deposit__background');
    const depositButton = document.querySelector('.deposit__button');
    if(e.target === depositBackground) {
      this.setState({depositModal: false});
    }
    if(e.target === depositButton) {
      // TODO: Find better solution than setTimeout
      setTimeout(() => {
        this.setState({depositModal: false});
      }, 200);
    }
  }

  renderWithdrawalModal = () => {
    this.setState({withdrawalModal: true});
  }

  closeWithdrawalModal = (e) => {
    const withdrawBackground = document.querySelector('.withdraw__background');
    const withdrawButton = document.querySelector('.withdraw__button');
    if(e.target === withdrawBackground) {
      this.setState({withdrawalModal: false});
    }
    if(e.target === withdrawButton) {
      // TODO: Find better solution than setTimeout
      setTimeout(() => {
        this.setState({withdrawalModal: false});
      }, 200);
    }
  }

  setMessage = (newMessage, txHash) => {
    this.setState({
      message: newMessage,
      txHash
    });
    console.log(this.state.message);
    console.log(this.state.txHash);
  }

  clearMessage = () => {
    this.setState({
      message: null,
      txHash: null
    });
  }

  render() {
    if(this.state.invalidFund) {
      return (<InvalidFund />);
    }

    if(this.state.fund) {
      return (
        <div className="fund">
          <Expiration 
            drizzle={this.props.drizzle} 
            drizzleState={this.props.drizzleState}
            fund={this.state.fund} />
          <Assets 
            drizzle={this.props.drizzle} 
            drizzleState={this.props.drizzleState}
            fund={this.state.fund} />
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
            <div className="deposit__background" onClick={this.closeDepositModal}>
              <DepositForm 
                drizzle={this.props.drizzle} 
                drizzleState={this.props.drizzleState}
                fund={this.state.fund}
                setMessage={this.setMessage}
                clearMessage={this.clearMessage} />
            </div>
          }
          {this.state.withdrawalModal &&
            <div className="withdraw__background" onClick={this.closeWithdrawalModal}>
              <WithdrawForm 
                drizzle={this.props.drizzle} 
                drizzleState={this.props.drizzleState}
                fund={this.state.fund}
                setMessage={this.setMessage}
                clearMessage={this.clearMessage} />
            </div>
          }
          <Details 
            drizzle={this.props.drizzle} 
            drizzleState={this.props.drizzleState}
            fund={this.state.fund} />
          <Message message={this.state.message} txHash={this.state.txHash} />
        </div>
      );
    }

    return null;
  }
}

export default FundContainer;