import React, {Component} from 'react';
import Button from '../Shared/Button';

import '../../layout/components/createfund.sass';

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
    console.log(nextId);
    console.log((nextId - 1).toString());
    this.setState({fundId: (nextId - 1).toString()});
  }

  render() {
    return(
      <section className="create-fund">
        <h1 className="create-fund__header">
          Deploy a Trustless Fund
        </h1>
        <form 
          className="create-fund__form" 
          onSubmit={this.handleSubmit}
        >
          <label className="create-fund__label">
            Set an expiration date
            <input 
              type="number"
              className="create-fund__input"
              placeholder="Expiration"
              onChange={this.handleExpirationChange}
              value={this.state.expiration}
            />
          </label>
          <label className="create-fund__label">
            Choose a beneficiary address
            <input 
              type="text"
              className="create-fund__input"
              placeholder="Beneficiary"
              onChange={this.handleBeneficiaryChange}
              value={this.state.beneficiary}
            />
          </label>
          <Button text="Create Fund" class="solid create-fund__button" link={null} button={true} onClick={this.handleSubmit} />
        </form>
        {this.state.fundId &&
          <a href={`/fund/${this.state.fundId}`} className="create-fund__link">
            Go to fund
          </a>
        }
      </section>
    );
  }
}

export default CreateFundForm;