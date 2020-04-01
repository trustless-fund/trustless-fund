import React, {Component} from 'react';

class WithdrawForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      amount: '',
      render: false
    }

    this.renderForm();
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

  getExpiration = async () => {
    const expiration = await this.props.drizzle.contracts.TrustlessFund.methods.expiration().call();
    return expiration;
  }

  getBeneficiary = async () => {
    const beneficiary = await this.props.drizzle.contracts.TrustlessFund.methods.beneficiary().call();
    return beneficiary;
  }

  renderForm = async () => {
    const beneficiary = await this.getBeneficiary();
    const expiration = await this.getExpiration();
    const ts = Math.round((new Date()).getTime() / 1000);

    if(beneficiary === this.props.drizzleState.accounts[0] && expiration < ts) {
      this.setState({render: true});
    }
  }

  render() {
    if(this.state.render) {
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
    return null;
  }
}

export default WithdrawForm;