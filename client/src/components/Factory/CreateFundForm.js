import React, {Component} from 'react';

class CreateFundForm extends Component {
  state = {
    expiration: '',
    beneficiary: '',
    fundId: null
  }

  handleExpirationChange = (e) => {
    this.setState({expiration: e.target.value});
  }

  handleBeneficiaryChange = (e) => {
    this.setState({beneficiary: e.target.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    await this.props.drizzle.contracts.TrustlessFundFactory.methods.createFund(
      this.state.expiration,
      this.state.beneficiary
    ).send({from: this.props.drizzleState.accounts[0]});

    const nextId = await this.props.drizzle.contracts.TrustlessFundFactory.methods.nextId().call();
    this.setState({fundId: nextId - 1});
  }

  render() {
    return(
      <section className="form">
        <h1 className="form__header">
          Deploy a Trustless Fund
        </h1>
        <form 
          className="form__form" 
          onSubmit={this.handleSubmit}
        >
          <input 
            type="number"
            className="form__input"
            placeholder="Expiration"
            onChange={this.handleExpirationChange}
            value={this.state.expiration}
          />
          <input 
            type="text"
            className="form__input"
            placeholder="Beneficiary"
            onChange={this.handleBeneficiaryChange}
            value={this.state.beneficiary}
          />
          <button className="form__button">
            Submit
          </button>
        </form>
        {this.state.fundId &&
          <a href={`/fund/${this.state.fundId}`}>
            Go to fund
          </a>
        }
      </section>
    );
  }
}

export default CreateFundForm;