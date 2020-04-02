import React, {Component} from 'react';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: null,
      beneficiary: null
    }

    this.getOwner();
    this.getBeneficiary();
  }

  getOwner = async () => {
    const owner = await this.props.drizzle.contracts.TrustlessFund.methods.owner().call();
    this.setState({owner});
  }

  getBeneficiary = async () => {
    const beneficiary = await this.props.drizzle.contracts.TrustlessFund.methods.beneficiary().call();
    this.setState({beneficiary});
  }

  render() {
    return (
      <div className="fund__details">
        <p className="fund__detail">
          <span className="fund__detail--bold">Owner:</span> 
          {this.state.owner}
        </p>
        <p className="fund__detail">
        <span className="fund__detail--bold">Beneficiary:</span> 
        {this.state.beneficiary}
        </p>
      </div>
    );
  }
}

export default Details;