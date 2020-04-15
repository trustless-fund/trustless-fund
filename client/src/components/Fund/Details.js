import React, {Component} from 'react';

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

  componentDidMount = () => {
    this.getEtherscanLink();
  }

  getOwner = async () => {
    const owner = await this.props.fund.methods.owner().call();
    this.setState({owner});
  }

  getBeneficiary = async () => {
    const beneficiary = await this.props.fund.methods.beneficiary().call();
    this.setState({beneficiary});
  }

  getEtherscanLink = () => {
    if(this.props.drizzleState.web3.networkId === 1) {
      return this.setState({etherscan: `https://etherscan.io/address/${this.props.fund._address}`});
    }
    if(this.props.drizzleState.web3.networkId === 3) {
      return this.setState({etherscan: `https://ropsten.etherscan.io/address/${this.props.fund._address}`});
    }
    if(this.props.drizzleState.web3.networkId === 4) {
      return this.setState({etherscan: `https://rinkeby.etherscan.io/address/${this.props.fund._address}`});
    }
    if(this.props.drizzleState.web3.networkId === 5) {
      return this.setState({etherscan: `https://goerli.etherscan.io/address/${this.props.fund._address}`});
    }
    if(this.props.drizzleState.web3.networkId === 42) {
      return this.setState({etherscan: `https://kovan.etherscan.io/address/${this.props.fund._address}`});
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