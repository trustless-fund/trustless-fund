import React, {Component} from 'react';
import CreateFundForm from './CreateFundForm';
import Message from '../Shared/Message';
import Button from '../Shared/Button';

import '../../layout/components/fundcreated.sass';

class FactoryContainer extends Component {
  state = {
    expiration: null,
    beneficiary: '',
    fundId: null,
    messsage: null,
    txHash: null
  }

  componentDidMount = () => {
    this.getDate();
  }

  getDate = () => {
    const date = Date.now();
    this.setState({expiration: date});
  }

  handleExpirationChange = (date) => {
    this.setState({expiration: date});
  }

  handleBeneficiaryChange = (e) => {
    this.setState({beneficiary: e.target.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    let expiration;
    if(this.state.expiration instanceof Date) {
      expiration = this.state.expiration.getTime() / 1000;
    } else {
      expiration = this.state.expiration;
    }

    await this.props.drizzle.contracts.TrustlessFundFactory.methods.createFund(
      expiration,
      this.state.beneficiary
    ).send({from: this.props.drizzleState.accounts[0]}, (err, txHash) => {
      this.setMessage('Transaction Pending...', txHash);
    }).on('confirmation', (number, receipt) => {
      if(number === 0) {
        this.setMessage('Transaction Confirmed!', receipt.txHash);
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

    const nextId = await this.props.drizzle.contracts.TrustlessFundFactory.methods.nextId().call();
    this.setState({fundId: (nextId - 1).toString()});
  }

  setMessage = (newMessage, txHash) => {
    this.setState({
      message: newMessage,
      txHash
    });
    console.log(this.state.message);
    console.log(this.state.txHash);
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
              class="outline" 
              link='/factory' button={false} />
            <Button 
              text="Go to Fund" 
              class="solid" 
              link={`/fund/${this.state.fundId}`} button={false} />
          </div>
          <Message message={this.state.message} txHash={this.state.txHash} />
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
          beneficiary={this.state.beneficiary}
          date={this.state.date} />
        <Message message={this.state.message} txHash={this.state.txHash} />
      </section>
    );
  }
}

export default FactoryContainer;