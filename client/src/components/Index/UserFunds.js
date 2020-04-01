import React, {Component} from 'react';
import UserFund from './UserFund';

class UserFunds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFunds: []
    }

    this.getUserFunds();
  }

  getUserFunds = async () => {
    const userFunds = await this.props.drizzle.contracts.TrustlessFundFactory.methods.getUserFunds(
      this.props.drizzleState.accounts[0]
    ).call();

    this.setState({userFunds});
  }

  render() {
    if(this.state.userFunds > 0) {
      return (
        <section className="user-funds">
          <h2 className="user-funds__header">
            Your Funds
          </h2>
          {this.state.userFunds.map((id, i) => {
            return (<UserFund key={i} id={id} />);
          })}
        </section>
      );
    }
    return null;
  }
}

export default UserFunds;