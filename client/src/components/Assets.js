import React, {Component} from 'react';

class Assets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenList: []
    }

    this.getAssets();
  }

  getAssets = async () => {
    const tokenLUTSize = await this.props.drizzle.contracts.TrustlessFund.methods.getTokenSize().call();
    let tokenList = [];

    if(tokenLUTSize > 0) {
      for(let i = 0; i < tokenLUTSize; i++) {
        const tokenAddress = await this.props.drizzle.contracts.TrustlessFund.methods.tokenLUT(i).call();
        const token = await this.props.drizzle.contracts.TrustlessFund.methods.tokens(tokenAddress).call();
        tokenList.push({address: tokenAddress, balance: token.balance});
      }
    }

    this.setState({tokenList});
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Assets;