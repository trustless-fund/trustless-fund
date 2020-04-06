import React, {Component} from 'react';
import Button from '../Shared/Button';

import '../../layout/components/withdraw.sass';

class WithdrawForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      amount: ''
    }

    console.log(this.props.tokenList);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({renderWithdrawal: nextProps.renderWithdrawal});
  }

  handleTokenChange = (e) => {
    this.setState({token: e.target.value});
  }

  handleAmountChange = (e) => {
    this.setState({amount: e.target.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const amount = this.props.drizzle.web3.utils.toHex(this.props.drizzle.web3.utils.toWei(this.state.amount));

    console.log(amount);

    await this.props.fund.methods.withdraw(
      amount,
      this.state.token
    ).send({
      from: this.props.drizzleState.accounts[0]
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
      setTimeout(() => {
        this.props.clearMessage();
      }, 10000);
    });
  }

  setMaxAmount = () => {
    let maxAmount;
    this.props.tokenList.forEach((token) => {
      if(token.address === this.state.token) {
        maxAmount = token.balance;
      }
    });
    maxAmount = this.props.drizzle.web3.utils.fromWei(maxAmount);

    this.setState({amount: maxAmount});
  }

  render() {
    return (
      <div className="withdraw">
        <h2 className="withdraw__header">Withdraw Token</h2>
        <form onSubmit={this.handleSubmit} className="withdraw__form">
          <label className="withdraw__label">
            Token
            <input 
              type="text"
              className="withdraw__input"
              placeholder="Token"
              onChange={this.handleTokenChange}
              value={this.state.token}
            />
          </label>
          <label className="withdraw__label">
            Amount
            <input 
              type="number"
              className="withdraw__input"
              placeholder="Amount"
              onChange={this.handleAmountChange}
              value={this.state.amount}
            />
          </label>
          {/* TODO: Should only appear if valid token is entered */}
          <button type="button" onClick={this.setMaxAmount}>
            Max
          </button>
          <Button 
            text="Withdraw" 
            class="solid withdraw__button" 
            link={null} 
            button={true}
          />
        </form>
      </div>
    );
  }
}

export default WithdrawForm;