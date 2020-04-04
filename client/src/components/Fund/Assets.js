import React, {Component} from 'react';
import Asset from './Asset';
import '../../layout/components/assets.sass';

class Assets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenList: []
    }

    this.getAssets();
  }

  getAssets = async () => {
    const tokenLUTSize = await this.props.fund.methods.getTokenSize().call();
    let tokenList = [];

    console.log(this.props.fund);

    if(tokenLUTSize > 0) {
      for(let i = 0; i < tokenLUTSize; i++) {
        const tokenAddress = await this.props.fund.methods.tokenLUT(i).call();
        const token = await this.props.fund.methods.tokens(tokenAddress).call();
        tokenList.push({address: tokenAddress, balance: token.balance});
      }
    }

    this.setState({tokenList});
  }

  render() {
    return (
      <div className="assets">
        <div className="assets__details">
          <p className="assets__detail">
            Assets
          </p>
          <p className="assets__detail">
            Amount/USD
          </p>
        </div>
        {this.state.tokenList.length === 0 &&
          <p className="asset__empty">
            No assets yet... Click deposit to get started.
          </p>
        }
        <ul className="assets__list">
          {this.state.tokenList.map((token, i) => {
            return (<Asset 
                      key={i} 
                      token={token} 
                      drizzle={this.props.drizzle} />);
          })}
        </ul>
      </div>
    );
  }
}

export default Assets;