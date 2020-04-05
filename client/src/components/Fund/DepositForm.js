import React, {Component} from 'react';
import Button from '../Shared/Button';
import ERC20 from '../../contracts/ERC20.json';

import '../../layout/components/deposit.sass';

class DepositForm extends Component {
  state = {
    token: '',
    amount: '',
    renderDeposit: this.props.render,
    approve: false
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({renderDeposit: nextProps.renderDeposit});
  }

  handleTokenChange = async (e) => {
    await this.setState({token: e.target.value});
    this.getTokenAllowance();
  }

  handleAmountChange = async (e) => {
    await this.setState({amount: e.target.value});
    this.getTokenAllowance();
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    let amount;

    if(this.state.token === '0x0000000000000000000000000000000000000000') {
      amount = this.props.drizzle.web3.utils.toHex(this.props.drizzle.web3.utils.toWei(this.state.amount));
    } else {
      amount = 0;
    }

    await this.props.fund.methods.deposit(
      amount,
      this.state.token
    ).send({
      from: this.props.drizzleState.accounts[0],
      value: amount
    }, (err, txHash) => {
      this.props.setMessage('Transaction Pending...', txHash);
    }).on('confirmation', (number, receipt) => {
      if(number === 0) {
        this.props.setMessage('Transaction Confirmed!', receipt.txHash);
        setTimeout(() => {
          this.props.clearMessage();
        }, 10000);
      }
    }).on('error', (err, receipt) => {
      this.props.setMessage('Transaction Failed.', receipt ? receipt.transactionHash : null);
    });
  }

  getTokenAllowance = async () => {
    if(this.state.token === '0x0000000000000000000000000000000000000000') {
      return;
    }
    
    // TODO: Only run if is address
    const token = await new this.props.drizzle.web3.eth.Contract(
      ERC20, this.state.token
    );

    const allowance = await token.methods.allowance(
      this.props.drizzleState.accounts[0], 
      this.props.fund._address
    ).call()
    
    if(allowance < this.state.amount) {
      this.setState({approve: true});
    } else {
      this.setState({approve: false});
    }
  }

  approveToken = async () => {
    // TODO: Only run if is address
    const token = await new this.props.drizzle.web3.eth.Contract(
      ERC20, this.state.token
    );

    token.methods.approve(
      this.props.fund._address,
      this.props.drizzle.web3.utils.toWei(this.state.amount)
    ).send({from: this.props.drizzleState.accounts[0]});
  }

  infiniteApproveToken = async () => {
    // TODO: Only run if is address
    const token = await new this.props.drizzle.web3.eth.Contract(
      ERC20, this.state.token
    );

    token.methods.approve(
      this.props.fund._address,
      this.props.drizzle.web3.utils.toWei(Number.MAX_SAFE_INTEGER)
    ).send({from: this.props.drizzleState.accounts[0]});
  }

  closeModal = () => {
    this.setState({renderDeposit: false});
  }

  render() {
    return (
      <div className="deposit">
        <h2 className="deposit__header">Deposit Token</h2>
        <form onSubmit={this.handleSubmit} className="deposit__form">
          <label className="deposit__label">
            Token
            <input 
              type="text"
              className="deposit__input"
              placeholder="Token"
              onChange={this.handleTokenChange}
              value={this.state.token}
            />
          </label>
          <label className="deposit__label">
            Amount
            <input 
              type="number"
              className="deposit__input"
              placeholder="Amount"
              onChange={this.handleAmountChange}
              value={this.state.amount}
            />
          </label>
          {this.state.approve && 
            <div>
              <button type="button" onClick={this.approveToken}>
                Unlock {this.state.amount}
              </button>
              <button type="button" onClick={this.infiniteApproveToken}>
                Infinite Unlock
              </button>
            </div>
          }
          {/* TODO: Disable if not unlocked */}
          <Button 
            text="Deposit" 
            class="solid deposit__button" 
            link={null} 
            button={true}
          />
        </form>
      </div>
    );
  }
}

export default DepositForm;