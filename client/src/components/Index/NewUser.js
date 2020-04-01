import React, {Component} from 'react';

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFunds: [],
      render: false
    }

    this.getUserFunds();
  }

  getUserFunds = async () => {
    const userFunds = await this.props.drizzle.contracts.TrustlessFundFactory.methods.getUserFunds(
      this.props.drizzleState.accounts[0]
    ).call();

    this.setState({userFunds});

    if(userFunds.length === 0) {
      this.setState({render: true});
    }
  }

  render() {
    if(this.state.render) {
      return (
        <section>
          <h1>Deploy a Trustless Fund</h1>
          <h4>Lock in the Time-Value of Your Money</h4>
          <a href="/">Learn More</a>
          <a href="/factory">Create Fund</a>
        </section>
      );
    }
    return null;
  }
}

export default NewUser;