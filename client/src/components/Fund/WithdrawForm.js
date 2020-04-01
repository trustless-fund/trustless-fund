import React, {Component} from 'react';

class WithdrawForm extends Component {
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

    await this.props.drizzle.contracts.TrustlessFund.methods.withdraw(
      this.state.amount,
      this.state.token
    ).send({
      from: this.props.drizzleState.accounts[0]
    });
  }

  render() {
    return (
      <div>
        <h2>Withdraw Form</h2>
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

export default WithdrawForm;