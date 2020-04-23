import React, {Component} from 'react';
import CreateFundForm from './CreateFundForm';
import Message from '../Shared/Message';
import Button from '../Shared/Button';

import '../../layout/components/fundcreated.sass';

class FactoryContainer extends Component {
  state = {
    expiration: null,
    beneficiaryValue: '',
    beneficiary: null,
    fundId: null,
    messsage: null,
    txHash: null,
    invalidAddress: false,
    invalidExpiration: false,
    minDate: null,
    factory: null
  }

  componentDidMount = () => {
    this.getDate();
    this.getFactoryContract();
  }

  getFactoryContract = () => {
    let contract;
    if(this.props.version === 'v1') {
      contract = this.props.drizzle.contracts.TrustlessFundFactory;
    } else if(this.props.version === 'v2') {
      contract = this.props.drizzle.contracts.TrustlessFundFactoryV2;
    }
    this.setState({factory: contract});
  }

  getDate = () => {
    const date = Date.now();
    this.setState({expiration: date});
    this.setState({minDate: date});
  }

  handleExpirationChange = (date) => {
    if(date > 32503680000000) {
      return this.setState({invalidExpiration: true});
    }
    this.setState({expiration: date});
    this.setState({invalidExpiration: false});
  }

  handleBeneficiaryChange = async (e) => {
    await this.setState({beneficiaryValue: e.target.value});
  }

  resolveENSAddress = async () => {
    try {
      const address = 
        await this.props.drizzle.web3.eth.ens.getAddress(this.state.beneficiaryValue);

      console.log(address);

      if(address === '0x0000000000000000000000000000000000000000') {
        return this.setState({invalidAddress: true});
      }

      if(this.props.drizzle.web3.utils.isAddress(address)) {
        this.setState({invalidAddress: false});
        this.setState({beneficiary: address});
      }
    } catch {
      this.setState({invalidAddress: true});
    }
  }

  isAddress = async () => {
    if(this.props.drizzle.web3.utils.isAddress(this.state.beneficiaryValue) || this.state.beneficiaryValue === '') {
      this.setState({beneficiary: this.state.beneficiaryValue});
      this.setState({invalidAddress: false});
    } else {
      await this.resolveENSAddress();
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    await this.isAddress();

    if(!this.state.invalidAddress) {
      let expiration;
      if(this.state.expiration instanceof Date) {
        expiration = Math.floor(this.state.expiration.getTime() / 1000);
      } else {
        expiration = Math.floor(this.state.expiration / 1000);
      }

      await this.state.factory.methods.createFund(
        expiration,
        this.state.beneficiary
      ).send({from: this.props.drizzleState.accounts[0]}, (err, txHash) => {
        this.setMessage('Transaction Pending...', txHash);
      }).on('confirmation', async (number, receipt) => {
        if(number === 0) {
          this.setMessage('Transaction Confirmed!', receipt.txHash);
          const nextId = await this.state.factory.methods.nextId().call();
          this.setState({fundId: (nextId - 1).toString()});
          setTimeout(() => {
            this.clearMessage();
          }, 10000);
        }
      }).on('error', (err, receipt) => {
        this.setMessage('Transaction Failed.', receipt ? receipt.transactionHash : null);
        setTimeout(() => {
          this.clearMessage();
        }, 10000);
      });
    }
  }

  setMessage = (newMessage, txHash) => {
    this.setState({
      message: newMessage,
      txHash
    });
  }

  clearMessage = () => {
    this.setState({
      message: null,
      txHash: null
    });
  }

  render() {
    if(this.state.fundId) {
      return(
        <section>
          <div className="fund-created">
            <Button 
              text="Create Fund" 
              class="outline fund-created__button" 
              link={`/${this.props.version}/factory`} button={false} />
            <Button 
              text="Go to Fund" 
              class="solid fund-created__button" 
              link={`/${this.props.version}/fund/${this.state.fundId}`} button={false} />
          </div>
          <Message 
            message={this.state.message} 
            txHash={this.state.txHash} 
            drizzleState={this.props.drizzleState} />
        </section>
      );
    }

    return(
      <section>
        <CreateFundForm 
          handleExpirationChange={this.handleExpirationChange}
          handleBeneficiaryChange={this.handleBeneficiaryChange}
          handleSubmit={this.handleSubmit}
          expiration={this.state.expiration}
          beneficiaryValue={this.state.beneficiaryValue}
          date={this.state.date}
          invalidAddress={this.state.invalidAddress}
          invalidExpiration={this.state.invalidExpiration}
          minDate={this.state.minDate} />
        <Message 
          message={this.state.message} 
          txHash={this.state.txHash} 
          drizzleState={this.props.drizzleState} />
      </section>
    );
  }
}

export default FactoryContainer;