import React, {Component} from 'react';
import UserFund from './UserFund';
import Button from '../Shared/Button';
import TrustlessFund from '../../contracts/TrustlessFund.json';

import '../../layout/components/userfunds.sass';

class UserFunds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFunds: null,
      render: false,
      userFundsLength: null
    }

    if(window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        this.props.drizzle.store.dispatch({type: 'ACCOUNTS_FETCHED', accounts});
        this.getUserFundsLength();
        this.getUserFunds();
      });
    }

    if(this.props.drizzle.web3.givenProvider) {
      this.getUserFundsLength();
    }
  }

  componentDidMount = async () => {
    if(this.props.drizzle.web3.givenProvider) {
      this.getUserFunds();
    }
  }

  getUserFundsLength = async () => {
    const v1FundIdArray = await this.props.drizzle.contracts.TrustlessFundFactory.methods.getUserFunds(
      this.props.drizzleState.accounts[0]
    ).call();
    const v2FundIdArray = await this.props.drizzle.contracts.TrustlessFundFactoryV2.methods.getUserFunds(
      this.props.drizzleState.accounts[0]
    ).call();
    const fundIdArray = v1FundIdArray.concat(v2FundIdArray);

    this.setState({userFundsLength: fundIdArray.length});

    if(fundIdArray.length > 0) {
      this.setState({render: true});
    } else {
      this.setState({render: false});
    }
  }

  getUserFunds = async () => {
    const v1FundIdArray = await this.props.drizzle.contracts.TrustlessFundFactory.methods.getUserFunds(
      this.props.drizzleState.accounts[0]
    ).call();
    const v2FundIdArray = await this.props.drizzle.contracts.TrustlessFundFactoryV2.methods.getUserFunds(
      this.props.drizzleState.accounts[0]
    ).call();

    let fundList = [];
    for(const id of v1FundIdArray) {
      const address = await this.props.drizzle.contracts.TrustlessFundFactory.methods.getFund(
        id
      ).call();
      
      const fund = await new this.props.drizzle.web3.eth.Contract(TrustlessFund.abi, address);
      const beneficiary = await fund.methods.beneficiary().call();
      const expiration = await fund.methods.expiration().call();

      const fundObj = {
        beneficiary,
        expiration,
        id,
        version: 'v1'
      }

      fundList.push(fundObj);
    }
    for(const id of v2FundIdArray) {
      const address = await this.props.drizzle.contracts.TrustlessFundFactoryV2.methods.getFund(
        id
      ).call();
      
      const fund = await new this.props.drizzle.web3.eth.Contract(TrustlessFund.abi, address);
      const beneficiary = await fund.methods.beneficiary().call();
      const expiration = await fund.methods.expiration().call();

      const fundObj = {
        beneficiary,
        expiration,
        id,
        version: 'v2'
      }

      fundList.push(fundObj);
    }

    this.setState({userFunds: fundList});
  }

  render() {
    if(this.state.render) {
      return (
        <section className={`user-funds${this.state.userFundsLength < 10 ? ' center' : ''}`}>
          <h2 className="user-funds__header">
            Your Funds
          </h2>
          <table className="user-funds__table">
            <thead>
              <tr className="user-funds__table-row">
                <th className="user-funds__table-header">Beneficiary</th>
                <th className="user-funds__table-header">Expiration</th>
                <th className="user-funds__table-header">ID</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userFunds && this.state.userFunds.map((fund, i) => {
                return (<UserFund key={i} fund={fund} />);
              })}
            </tbody>
          </table>
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