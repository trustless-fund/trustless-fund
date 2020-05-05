import React, {Component} from 'react';
import {getEtherscanLink} from '../../utils/helpers';
import ENS from 'ethereum-ens';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: null,
      ownerENS: null,
      beneficiary: null,
      beneficiaryENS: null,
      etherscan: null
    }

    this.ens = new ENS(this.props.web3);
    this.getOwner();
    this.getBeneficiary();
  }

  componentDidMount = async () => {
    const etherscan = await getEtherscanLink(this.props.networkId, `/address/${this.props.fund._address}`);
    this.setState({etherscan});
  }

  getOwner = async () => {
    const owner = await this.props.fund.methods.owner().call();
    this.setState({owner});

    try {
      let name = await this.ens.reverse(owner).name();
      if(owner !== await this.ens.resolver(name).addr()) {
        name = null;
      } else {
        this.setState({ownerENS: name});
      } 
    } catch {
      
    }
  }

  getBeneficiary = async () => {
    const beneficiary = await this.props.fund.methods.beneficiary().call();
    this.setState({beneficiary});

    try {
      let name = await this.ens.reverse(beneficiary).name();
      if(beneficiary !== await this.ens.resolver(name).addr()) {
        name = null;
      } else {
        this.setState({beneficiaryENS: name});
      } 
    } catch {
      
    }
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
          {this.state.ownerENS ? `${this.state.ownerENS}` :
            this.state.owner ? 
              `${this.state.owner.slice(0, 4)}...${this.state.owner.slice(this.state.owner.length - 4, this.state.owner.length)}` : 
              null}
        </p>
        <p className="fund__detail">
          <span className="fund__detail--bold">Beneficiary:</span> 
          {this.state.beneficiaryENS ? `${this.state.beneficiaryENS}` :
            this.state.beneficiary ? 
              `${this.state.beneficiary.slice(0, 4)}...${this.state.beneficiary.slice(this.state.beneficiary.length - 4, this.state.beneficiary.length)}` : 
              null}
        </p>
      </div>
    );
  }
}

export default Details;