import React, {Component} from 'react';

class Form extends Component {
  state = {
    expiration: '',
    fundId: null,
    accounts: []
  }

  handleExpirationChange = (e) => {
    this.setState({expiration: e.target.value});
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.accounts !== nextProps.accounts) {
      this.setState({accounts: nextProps.accounts});
    }
    console.log(this.state);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Input validation
      // Only allow future times
      // Return error
    
    await this.props.factory.methods.createFund(
      this.state.expiration
    ).send({from: this.props.account});

    // TODO: Add error handling and transaction receipts

    this.props.factory.methods.nextId().call((err, res) => {
      if(err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }

  render() {
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
          <button className="form__button">
            Submit
          </button>
        </form>

        {this.state.accounts}
      </section>
    );
  }
}

export default Form;