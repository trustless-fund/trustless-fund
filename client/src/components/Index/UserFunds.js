import React, {Component} from 'react';
import UserFund from './UserFund';
import Button from '../Shared/Button';

import TrustlessFundV1 from '../../contracts/TrustlessFund.json';
import TrustlessFundV2 from '../../contracts/TrustlessFundV2.json';
import TrustlessFundFactoryV1 from '../../contracts/TrustlessFundFactory.json';
import TrustlessFundFactoryV2 from '../../contracts/TrustlessFundFactoryV2.json';

import '../../layout/components/userfunds.sass';

class UserFunds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFunds: null,
      userFundsLength: null,
      render: false,
      FactoryV1: null,
      FactoryV2: null
    }

    if(window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        this.getUserFundsLength();
        this.getUserFunds();
      });
    }
  }

  componentDidMount = () => {
    this.initialize();
  }

  componentDidUpdate = () => {
    if(!this.state.FactoryV1) {
      this.initialize();
    }
  }

  initialize = async () => {
    if(this.props.web3) {
      if(this.props.web3.givenProvider) {
        const FactoryV1 = await new this.props.web3.eth.Contract(
          TrustlessFundFactoryV1.abi, 
          TrustlessFundFactoryV1.networks[this.props.networkId].address
        );
        const FactoryV2 = await new this.props.web3.eth.Contract(
          TrustlessFundFactoryV2.abi, 
          TrustlessFundFactoryV2.networks[this.props.networkId].address
        );
  
        await this.setState({FactoryV1});
        await this.setState({FactoryV2});
  
        await this.getUserFundsLength();
        if(this.state.render) {
          this.getUserFunds();
        }
      }
    }
  }

  getUserFundsLength = async () => {
    const v1FundIdArray = await this.state.FactoryV1.methods.getUserFunds(
      this.props.address
    ).call();
    const v2FundIdArray = await this.state.FactoryV2.methods.getUserFunds(
      this.props.address
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
    const v1FundIdArray = await this.state.FactoryV1.methods.getUserFunds(
      this.props.address
    ).call();
    const v2FundIdArray = await this.state.FactoryV2.methods.getUserFunds(
      this.props.address
    ).call();

    let fundList = [];
    for(const id of v1FundIdArray) {
      const address = await this.state.FactoryV1.methods.getFund(
        id
      ).call();
      
      const fund = await new this.props.web3.eth.Contract(TrustlessFundV1.abi, address);
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
      const address = await this.state.FactoryV2.methods.getFund(
        id
      ).call();
      
      const fund = await new this.props.web3.eth.Contract(TrustlessFundV2.abi, address);
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
        <section className='user-funds'>
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