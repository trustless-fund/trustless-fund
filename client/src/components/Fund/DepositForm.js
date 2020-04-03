import React, {Component} from 'react';
import Button from '../Shared/Button';

import '../../layout/components/deposit.sass';

class DepositForm extends Component {
  state = {
    token: '',
    amount: ''
  }

  handleTokenChange = (e) => {
    this.setState({token: e.target.value});
  }

  handleAmountChange = (e) => {
    this.setState({amount: e.target.value});
  }

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

  render() {
    return (
      <div className="deposit">
        <div className="deposit__modal">
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
}

export default DepositForm;