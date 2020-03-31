import React, {Component} from 'react';

class Form extends Component {
  state = {
    expiration: '',
    beneficiary: ''
  }

  handleExpirationChange = (e) => {
    this.setState({expiration: e.target.value});
  }

  handleBeneficiaryChange = (e) => {
    this.setState({beneficiary: e.target.value});
  }

  render() {
    console.log(this.props);
    return(
      <section className="form">
        <h1 className="form__header">
          Create a TrustFund
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
        {/* {this.state.fundId &&
          <a href={`/fund/${this.state.fundId}`}>
            Go to fund
          </a>
        } */}
      </section>
    );
  }
}

export default Form;