import React, {Component} from 'react';

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
      <div>
        <h2>Deposit Form</h2>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            className="form__input"
            placeholder="Token"
            onChange={this.handleTokenChange}
            value={this.state.token}
          />
          <input 
            type="number"
            className="form__input"
            placeholder="Amount"
            onChange={this.handleAmountChange}
            value={this.state.amount}
          />
          <button className="form__button">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default DepositForm;