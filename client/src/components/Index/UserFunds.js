import React, {Component} from 'react';
import UserFund from './UserFund';
import Button from '../Shared/Button';
import TrustlessFund from '../../contracts/TrustlessFund.json';

import '../../layout/components/userfunds.sass';

class UserFunds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFunds: [],
      render: false
    }

    window.ethereum.on('accountsChanged', (accounts) => {
      this.props.drizzle.store.dispatch({type: 'ACCOUNTS_FETCHED', accounts});
      this.getUserFunds();
    });

    this.getUserFunds();
  }

  getUserFunds = async () => {
    const userFunds = await this.props.drizzle.contracts.TrustlessFundFactory.methods.getUserFunds(
      this.props.drizzleState.accounts[0]
    ).call();

    let fundList = [];
    userFunds.forEach(async (fundId) => {
      const address = await this.props.drizzle.contracts.TrustlessFundFactory.methods.getFund(
        fundId
      ).call();
      
      const fund = await new this.props.drizzle.web3.eth.Contract(TrustlessFund.abi, address);
      const beneficiary = await fund.methods.beneficiary().call();
      const expiration = await fund.methods.expiration().call();

      const fundObj = await {
        beneficiary,
        expiration,
        id: fundId
      }

      fundList.push(fundObj);
      this.setState({userFunds: fundList});
    });

    if(userFunds.length > 0) {
      this.setState({render: true});
    } else {
      this.setState({render: false});
    }
  }

  render() {
    if(this.state.render) {
      return (
        <section className="user-funds">
          <h2 className="user-funds__header">
            Your Funds
          </h2>
          {this.state.userFunds.map((fund, i) => {
            return (<UserFund key={i} fund={fund} />);
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