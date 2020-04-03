import React, {Component} from 'react';
import Button from '../Shared/Button';

import x from '../../assets/x.svg';

import '../../layout/components/deposit.sass';

class DepositForm extends Component {
  state = {
    token: '',
    amount: '',
    renderDeposit: this.props.render
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({renderDeposit: nextProps.renderDeposit});
  }

  handleTokenChange = (e) => {
    this.setState({token: e.target.value});
  }

  handleAmountChange = (e) => {
    this.setState({amount: e.target.value});
  }

  // TODO: Close modals on submit
  handleSubmit = async (e) => {
    e.preventDefault();

    let amount;

    if(this.state.token === '0x0000000000000000000000000000000000000000') {
      amount = this.state.amount;
    } else {
      amount = 0;
    }

    await this.props.drizzle.contracts.TrustlessFund.methods.deposit(
      this.state.amount,
      this.state.token
    ).send({
      from: this.props.drizzleState.accounts[0],
      value: amount
    });
  }

  closeModal = () => {
    this.setState({renderDeposit: false});
  }

  render() {
    if(this.state.renderDeposit) {
      return (
        <div className="deposit" onClick={this.closeModal}>
          <div className="deposit__modal">
            <img 
              src={x} 
              alt="X" 
              onClick={this.closeModal} 
              className="deposit__x" />
            <h2 className="deposit__header">Deposit Token</h2>
            <form onSubmit={this.handleSubmit} className="deposit__form">
              <label className="deposit__label">
                Token
                <input 
                  type="text"
                  className="deposit__input"
                  placeholder="Token"
                  onChange={this.handleTokenChange}
                  value={this.state.token}
                />
              </label>
              <label className="deposit__label">
                Amount
                <input 
                  type="number"
                  className="deposit__input"
                  placeholder="Amount"
                  onChange={this.handleAmountChange}
                  value={this.state.amount}
                />
              </label>
              <Button 
                text="Deposit" 
                class="solid deposit__button" 
                link={null} 
                button={true}
              />
            </form>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default DepositForm;