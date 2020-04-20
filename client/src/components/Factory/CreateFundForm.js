import React, {Component} from 'react';
import Button from '../Shared/Button';
import Warning from '../Shared/Warning';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '../../layout/components/createfund.sass';

class CreateFundForm extends Component {
  state = {
    invalidAddress: this.props.invalidAddress,
    invalidExpiration: this.props.invalidExpiration
  }

  componentWillReceiveProps = async (nextProps) => {
    await this.setState({invalidAddress: nextProps.invalidAddress});
    await this.setState({invalidExpiration: nextProps.invalidExpiration});
  }

  render() {
    return(
      <div className="create-fund">
        <h1 className="create-fund__header">
          Deploy a Trustless Fund
        </h1>
        <form 
          className="create-fund__form" 
          onSubmit={this.props.handleSubmit}
        >
          <label className="create-fund__label">
            Set an expiration date
            <DatePicker 
              selected={this.props.expiration}
              onChange={(date) => this.props.handleExpirationChange(date)}
              showPopperArrow={false}
              minDate={this.props.minDate} />
          </label>
          <label className="create-fund__label">
            Choose a beneficiary address
            <input 
              type="text"
              className="create-fund__input"
              placeholder="Beneficiary"
              onChange={this.props.handleBeneficiaryChange}
              value={this.props.beneficiary}
            />
          </label>
          {this.state.invalidAddress &&
            <p className="create-fund__invalid">
              Invalid Address
            </p>
          }
          {this.state.invalidExpiration &&
            <p className="create-fund__invalid">
              Invalid Expiration
            </p>
          }
          <Button 
            text="Create Fund" 
            class="solid create-fund__button" 
            link={null} button={true} 
            onClick={this.props.handleSubmit} />
          <Warning 
            message="This application is unaudited. Use at your own risk." />
        </form>
      </div>
    );
  }
}

export default CreateFundForm;