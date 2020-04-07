import React, {Component} from 'react';
import TokenInput from './TokenInput';
import {TOKEN_LIST} from '../../utils/tokenList';

class TokenInputDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenList: null,
      usdAmounts: null,
      allTokens: TOKEN_LIST[this.props.drizzleState.web3.networkId]
    }
  }

  componentDidMount = async () => {
    await this.getUsdAmounts();
    this.getTokenList();
  }

  getUsdAmounts = () => {
    let usdAmounts = {}
    this.props.assetList.forEach(asset => {
      if(asset.balance > 0) {
        usdAmounts[asset.address] = asset.balance;
      }
    });

    this.setState({usdAmounts});
  }

  getTokenList = () => {
    const {allTokens} = this.state;

    // Source: https://github.com/Uniswap/uniswap-frontend
    const tokenList = Object.keys(allTokens)
      .sort((a, b) => {
        if (allTokens[a].symbol && allTokens[b].symbol) {
          const aSymbol = allTokens[a].symbol.toLowerCase()
          const bSymbol = allTokens[b].symbol.toLowerCase()

          // Pin ETH to the top
          if (aSymbol === 'ETH'.toLowerCase() || bSymbol === 'ETH'.toLowerCase()) {
            return aSymbol === bSymbol ? 0 : aSymbol === 'ETH'.toLowerCase() ? -1 : 1;
          }

          // Tokens with a balance
          if(this.state.usdAmounts[a] && !this.state.usdAmounts[b]) {
            return -1;
          } else if(this.state.usdAmounts[b] && !this.state.usdAmounts[a]) {
            return 1;
          }

          // Sort by balance
          if (this.state.usdAmounts[a] && this.state.usdAmounts[b]) {
            const aUSD = this.state.usdAmounts[a]
            const bUSD = this.state.usdAmounts[b]

            return aUSD > bUSD ? -1 : aUSD < bUSD ? 1 : 0
          }

          // Sort remaining tokens alphabetically
          return aSymbol < bSymbol ? -1 : aSymbol > bSymbol ? 1 : 0
        } else {
          return 0
        }
      });

    this.setState({tokenList});
  }

  render() {
    console.log(this.state.tokenList);
    return (
      <ul>
        {this.state.tokenList && this.state.tokenList.map((token, i) => {
          return (<TokenInput 
            key={i} 
            token={token} 
            allTokens={this.state.allTokens}
            drizzle={this.props.drizzle} />);
        })}
      </ul>
    );
  }
}

export default TokenInputDropdown;