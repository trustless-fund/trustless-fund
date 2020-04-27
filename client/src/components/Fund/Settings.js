import React, {Component} from 'react';
import Warning from '../Shared/Warning';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beneficiary: '',
      expiration: ''
    }
  }

  componentDidMount = async () => {
    const beneficiary = await this.props.fund.methods.beneficiary().call();
    const expiration = await this.props.fund.methods.expiration().call();

    this.setState({beneficiary});
    this.setState({expiration});
  }

  handleBeneficiaryChange = (e) => {
    this.setState({beneficiary: e.target.value});
  }

  handleExpirationChange = () => {

  }

  handleBeneficiarySubmit = async (e) => {
    e.preventDefault();

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

  handleExpirationSubmit = () => {

  }

  handleRenounceSubmit = () => {

  }

  render() {
    return (
      <div className="settings">
        <h2 className="settings__header">
          Settings
        </h2>
        <p className="settings__subheader">
          Danger Zone
        </p>
        <form 
          className="settings__form"
          onSubmit={this.handleBeneficiarySubmit}>
          <label className="settings__label">
            Beneficiary Address
            <input 
              type="text"
              className="settings__input"
              value={this.state.beneficiary}
              onChange={this.handleBeneficiaryChange}>
            </input>
          </label>
          <button className="settings__button">
            Change
          </button>
        </form>
        <form 
          className="settings__form"
          onSubmit={this.handleExpirationSubmit}>
          <label className="settings__label">
            Expiration Date
            <input 
              type="text"
              className="settings__input"
              value={this.state.expiration}
              onChange={this.handleExpirationChange}>
            </input>
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
          <button className="settings__button">
            Renounce
          </button>
          <p className="setting__renounce-note">
            Note: If you renounce ownership, you will no longer 
            have the ability to modify the beneficiary address or 
            expiration date.
          </p>
        </form>
        <Warning
          message="These are potentially destructive actions." />
      </div>
    );
  }
}

export default Settings;