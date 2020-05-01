import React, {Component} from 'react';
import Warning from '../Shared/Warning';
import DatePicker from 'react-datepicker';
import {resolveENSAddress} from '../../utils/helpers';

import '../../layout/components/settings.sass';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beneficiary: null,
      beneficiaryValue: '',
      expiration: 0,
      minDate: 0,
      invalidAddress: false,
      ENSAddress: null
    }
  }

  componentDidMount = async () => {
    const beneficiaryValue = await this.props.fund.methods.beneficiary().call();
    const expiration = await this.props.fund.methods.expiration().call();
    const expirationDate = new Date(expiration * 1000);

    this.setState({beneficiaryValue});
    this.setState({expiration: expirationDate});
    this.setState({minDate: expirationDate});
  }

  handleBeneficiaryChange = async (e) => {
    await this.setState({beneficiaryValue: e.target.value});
    this.isENSAddress();
  }

  handleExpirationChange = (date) => {
    this.setState({expiration: date});
  }

  isENSAddress = async () => {
    const address = await resolveENSAddress(this.state.beneficiaryValue, this.props.drizzle.web3);
    if(address) {
      this.setState({ENSAddress: address});
    } else {
      this.setState({ENSAddress: null});
    }
  }

  isAddress = async () => {
    if(this.props.drizzle.web3.utils.isAddress(this.state.beneficiaryValue) || this.state.beneficiaryValue === '') {
      this.setState({beneficiary: this.state.beneficiaryValue});
      this.setState({invalidAddress: false});
    } else {
      const address = await resolveENSAddress(this.state.beneficiaryValue, this.props.drizzle.web3);
      if(address) {
        this.setState({invalidAddress: false});
        this.setState({beneficiary: address});
      } else {
        this.setState({invalidAddress: true});
      }
    }
  }

  handleBeneficiarySubmit = async (e) => {
    e.preventDefault();

    await this.isAddress();

    if(!this.state.invalidAddress) {
      await this.props.fund.methods.updateBeneficiary(this.state.beneficiary).send({
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
  }

  handleExpirationSubmit = async (e) => {
    e.preventDefault();

    let expiration;
    if(this.state.expiration instanceof Date) {
      expiration = Math.floor(this.state.expiration.getTime() / 1000);
    } else {
      expiration = Math.floor(this.state.expiration / 1000);
    }

    await this.props.fund.methods.increaseTime(expiration).send({
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

  handleRenounceSubmit = async (e) => {
    e.preventDefault()

    await this.props.fund.methods.renounceOwnership().send({
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

  render() {
    return (
      <div className="settings">
        <h2 className="settings__header">
          Settings
        </h2>
        <Warning
          className="settings__warning"
          message="Warning: these are potentially destructive actions." />
        <form 
          className="settings__form"
          onSubmit={this.handleBeneficiarySubmit}>
          <label className="settings__label">
            Beneficiary Address
            <input 
              type="text"
              className="settings__input"
              value={this.state.beneficiaryValue}
              onChange={this.handleBeneficiaryChange}>
            </input>
            <span className="settings__address">
              {this.state.ENSAddress}
            </span>
          </label>
          {this.state.invalidAddress &&
            <p className="settings__invalid">
              Invalid Address
            </p>
          }
          <button className="settings__button">
            Change
          </button>
        </form>
        <form 
          className="settings__form"
          onSubmit={this.handleExpirationSubmit}>
          <label className="settings__label">
            Expiration Date
            <DatePicker 
              selected={this.state.expiration}
              onChange={(date) => this.handleExpirationChange(date)}
              showPopperArrow={false}
              minDate={this.state.minDate} />
          </label>
          <button className="settings__button">
            Change
          </button>
        </form>
        <form 
          className="settings__form settings__form--renounce"
          onSubmit={this.handleRenounceSubmit}>
          <label className="settings__label">
            Renounce Ownership
          </label>
          <button className="settings__button settings__button--renounce">
            Renounce
          </button>
          <p className="settings__renounce-note">
            Note: If you renounce ownership, you will no longer 
            have the ability to modify the beneficiary address or 
            expiration date.
          </p>
        </form>
      </div>
    );
  }
}

export default Settings;