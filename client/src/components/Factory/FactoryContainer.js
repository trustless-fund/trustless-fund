import React, {Component} from 'react';
import CreateFundForm from './CreateFundForm';
import Message from '../Shared/Message';
import Button from '../Shared/Button';
import {resolveENSAddress} from '../../utils/helpers';

import TrustlessFundFactoryV2 from '../../contracts/TrustlessFundFactoryV2.json';

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
    factory: null,
    ENSAddress: null,
    connected: null
  }

  componentDidMount = () => {
    this.initialize();
  }

  componentDidUpdate = () => {
    if(!this.state.expiration || this.props.connected !== this.state.connected) {
      this.initialize();
    }
  }

  initialize = () => {
    this.getDate();
    if(this.props.web3) {
      this.getFactoryContract();
    }
    if(this.props.connected !== this.state.connected) {
      this.setState({connected: this.props.connected});
    }
  }

  getFactoryContract = () => {
    const contract = new this.props.web3.eth.Contract(
      TrustlessFundFactoryV2.abi,
      TrustlessFundFactoryV2.networks[this.props.networkId].address
    );
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
    setTimeout(() => {
      this.isENSAddress();
    }, 300);
  }

  isENSAddress = async () => {
    const address = await resolveENSAddress(this.state.beneficiaryValue, this.props.web3);
    if(address) {
      this.setState({ENSAddress: address});
    } else {
      this.setState({ENSAddress: null});
    }
  }

  isAddress = async () => {
    if(this.props.web3.utils.isAddress(this.state.beneficiaryValue) || this.state.beneficiaryValue === '') {
      this.setState({beneficiary: this.state.beneficiaryValue});
      this.setState({invalidAddress: false});
    } else {
      const address = await resolveENSAddress(this.state.beneficiaryValue, this.props.web3);
      if(address) {
        this.setState({invalidAddress: false});
        this.setState({beneficiary: address});
      } else {
        this.setState({invalidAddress: true});
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    if(!this.props.web3) {
      this.setMessage('No Wallet Connected', null, true);
      setTimeout(() => {
        this.clearMessage();
      }, 5000);
      return;
    }

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
      ).send({from: this.props.address}, (err, txHash) => {
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

  setMessage = (newMessage, txHash, error) => {
    this.setState({
      message: newMessage,
      txHash,
      messageError: error
    });
  }

  clearMessage = () => {
    this.setState({
      message: null,
      txHash: null,
      messageError: null
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
              link={`/v2/fund/${this.state.fundId}`} button={false} />
          </div>
          <Message 
            message={this.state.message} 
            txHash={this.state.txHash}
            networkId={this.props.networkId} />
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
          minDate={this.state.minDate}
          ENSAddress={this.state.ENSAddress} />
        <Message 
          message={this.state.message} 
          txHash={this.state.txHash}
          networkId={this.props.networkId}
          error={this.state.messageError} />
      </section>
    );
  }
}

export default FactoryContainer;