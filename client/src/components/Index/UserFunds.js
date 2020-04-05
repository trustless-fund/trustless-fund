import React, {Component} from 'react';
import UserFund from './UserFund';
import Button from '../Shared/Button';

import '../../layout/components/userfunds.sass';

class UserFunds extends Component {
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

    if(userFunds.length > 0) {
      this.setState({render: true});
    }
  }

  render() {
    if(this.state.render) {
      return (
        <section className="user-funds">
          <h2 className="user-funds__header">
            Your Funds
          </h2>
          {this.state.userFunds.map((id, i) => {
            return (<UserFund key={i} id={id} />);
          })}
          <Button 
            text="Create Fund" 
            class="solid user-funds__button" 
            link="/factory" 
            button={false} />
        </section>
      );
    }
    return null;
  }
}

export default UserFunds;