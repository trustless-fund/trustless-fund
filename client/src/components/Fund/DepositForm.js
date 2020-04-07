import React, {Component} from 'react';
import Button from '../Shared/Button';
import TokenInputDropdown from './TokenInputDropdown';
import ERC20 from '../../contracts/ERC20.json';

import '../../layout/components/deposit.sass';

class DepositForm extends Component {
  state = {
    token: null,
    searchToken: '',
    amount: '',
    renderDeposit: this.props.render,
    approve: false
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({renderDeposit: nextProps.renderDeposit});
  }

  handleSearchTokenChange = async (e) => {
    await this.setState({searchToken: e.target.value});
  }

  handleAmountChange = async (e) => {
    await this.setState({amount: e.target.value});
    this.getTokenAllowance();
  }

  setToken = async (token) => {
    await this.setState({token});
    this.getTokenAllowance();
  }

  getDecimals = async () => {
    if(this.state.token !== '0x0000000000000000000000000000000000000000') {
      const token = await new this.props.drizzle.web3.eth.Contract(
        ERC20, this.state.token
      );
      const decimals = await token.methods.decimals().call();
      return decimals;
    }
  }

  toWeiDecimals = (amount, decimals) => {
    const finalAmount = amount*10**decimals;
    return finalAmount;
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const decimals = await this.getDecimals();
    let amount;

    if(decimals && decimals !== '18') {
      amount = this.props.drizzle.web3.utils.toHex(this.toWeiDecimals(this.state.amount, decimals));
    } else {
      amount = this.props.drizzle.web3.utils.toHex(this.props.drizzle.web3.utils.toWei(this.state.amount));
    }

    let sendAmount;

    if(this.state.token === '0x0000000000000000000000000000000000000000') {
      sendAmount = amount;
    } else {
      sendAmount = 0;
    }

    await this.props.fund.methods.deposit(
      amount,
      this.state.token
    ).send({
      from: this.props.drizzleState.accounts[0],
      value: sendAmount
    }, (err, txHash) => {
      this.props.setMessage('Transaction Pending...', txHash);
    }).on('confirmation', (number, receipt) => {
      if(number === 0) {
        this.props.setMessage('Transaction Confirmed!', receipt.txHash);
        this.props.getAssets();
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
    ).send({from: this.props.drizzleState.accounts[0]}, (err, txHash) => {
      this.props.setMessage('Transaction Pending...', txHash);
    }).on('confirmation', (number, receipt) => {
      if(number === 0) {
        this.props.setMessage('Transaction Confirmed!', receipt.txHash);
        setTimeout(() => {
          this.props.clearMessage();
        }, 10000);
      }
      this.setState({approve: false});
    }).on('error', (err, receipt) => {
      this.props.setMessage('Transaction Failed.', receipt ? receipt.transactionHash : null);
      setTimeout(() => {
        this.props.clearMessage();
      }, 10000);
    });
  }

  infiniteApproveToken = async () => {
    // TODO: Only run if is address
    const token = await new this.props.drizzle.web3.eth.Contract(
      ERC20, this.state.token
    );

    token.methods.approve(
      this.props.fund._address,
      this.props.drizzle.web3.utils.toWei(Number.MAX_SAFE_INTEGER)
    ).send({from: this.props.drizzleState.accounts[0]}, (err, txHash) => {
      this.props.setMessage('Transaction Pending...', txHash);
    }).on('confirmation', (number, receipt) => {
      if(number === 0) {
        this.props.setMessage('Transaction Confirmed!', receipt.txHash);
        setTimeout(() => {
          this.props.clearMessage();
        }, 10000);
      }
      this.setState({approve: false});
    }).on('error', (err, receipt) => {
      this.props.setMessage('Transaction Failed.', receipt ? receipt.transactionHash : null);
      setTimeout(() => {
        this.props.clearMessage();
      }, 10000);
    });
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
              onChange={this.handleSearchTokenChange}
              value={this.state.searchToken}
            />
          </label>
          <TokenInputDropdown 
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            assetList={this.props.tokenList}
            searchToken={this.state.searchToken}
            setToken={this.setToken} />
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
            <div className="deposit__unlocks">
              <button 
                type="button" 
                onClick={this.approveToken}
                className="deposit__unlock">
                  Unlock {this.state.amount}
              </button>
              <button 
                type="button" 
                onClick={this.infiniteApproveToken}
                className="deposit__unlock">
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