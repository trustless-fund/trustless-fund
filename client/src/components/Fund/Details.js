import React, {Component} from 'react';
import {getEtherscanLink} from '../../utils/helpers';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: null,
      beneficiary: null,
      etherscan: null
    }

    this.getOwner();
    this.getBeneficiary();
  }

  componentDidMount = async () => {
    const etherscan = await getEtherscanLink(this.props.drizzleState.web3.networkId, `/address/${this.props.fund._address}`);
    this.setState({etherscan});
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
        <a 
          href={this.state.etherscan}
          target="_blank"
          rel="noopener noreferrer"
          className="fund__detail-link">
          View on etherscan
        </a>
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