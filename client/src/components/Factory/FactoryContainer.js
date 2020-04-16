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
    minDate: null
  }

  componentDidMount = () => {
    this.getDate();
  }

  getDate = () => {
    const date = Date.now();
    this.setState({expiration: date});
    this.setState({minDate: date});
  }

  handleExpirationChange = (date) => {
    this.setState({expiration: date});
  }

  handleBeneficiaryChange = async (e) => {
    await this.setState({beneficiaryValue: e.target.value});
  }

  resolveENSAddress = async () => {
    try {
      const address = 
        await this.props.drizzle.web3.eth.ens.getAddress(this.state.beneficiaryValue);

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

      await this.props.drizzle.contracts.TrustlessFundFactory.methods.createFund(
        expiration,
        this.state.beneficiary
      ).send({from: this.props.drizzleState.accounts[0]}, (err, txHash) => {
        this.setMessage('Transaction Pending...', txHash);
      }).on('confirmation', async (number, receipt) => {
        if(number === 0) {
          this.setMessage('Transaction Confirmed!', receipt.txHash);
          const nextId = await this.props.drizzle.contracts.TrustlessFundFactory.methods.nextId().call();
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
              link='/factory' button={false} />
            <Button 
              text="Go to Fund" 
              class="solid fund-created__button" 
              link={`/fund/${this.state.fundId}`} button={false} />
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