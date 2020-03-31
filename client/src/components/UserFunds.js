import React, {Component} from 'react';
import UserFund from './UserFund';

class UserFunds extends Component {
  state = {
    userFunds: []
  }

  componentDidMount = async () => {
    const userFunds = await this.props.drizzle.contracts.TrustlessFundFactory.methods.getUserFunds(
      this.props.drizzleState.accounts[0]
    ).call();

    this.setState({userFunds});
  }

  render() {
    console.log(this.state.userFunds)
    return (
      <section className="user-funds">
        <h2 className="user-funds__header">
          Your Funds
        </h2>
        {this.state.userFunds.map((id, i) => {
          return (<UserFund key={i} id={id} />);
        })}
      </section>
    )
  }
}

export default UserFunds;