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
    const owner = await this.props.fund.methods.owner().call();
    this.setState({owner});
  }

  getBeneficiary = async () => {
    const beneficiary = await this.props.fund.methods.beneficiary().call();
    this.setState({beneficiary});
  }

  render() {
    return (
      <div className="fund__details">
        <p className="fund__detail">
          <span className="fund__detail--bold">Owner:</span> 
          {this.state.owner ? 
            `${this.state.owner.slice(0, 4)}...${this.state.owner.slice(this.state.owner.length - 4, this.state.owner.length)}` : 
            null}
        </p>
        <p className="fund__detail">
          <span className="fund__detail--bold">Beneficiary:</span> 
          {this.state.beneficiary ? 
            `${this.state.beneficiary.slice(0, 4)}...${this.state.beneficiary.slice(this.state.beneficiary.length - 4, this.state.beneficiary.length)}` : 
            null}
        </p>
      </div>
    );
  }
}

export default Details;