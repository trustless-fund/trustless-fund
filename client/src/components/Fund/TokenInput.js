import React, {Component} from 'react';

import '../../layout/components/tokeninput.sass';

class TokenInput extends Component {
  state = {
    logo: null
  }

  componentDidMount = () => {
    this.getLogo();
  }

  getLogo = () => {
    let logo;
    if(this.props.token === '0x0000000000000000000000000000000000000000') {
      logo = 'https://cdn.iconscout.com/icon/free/png-256/ethereum-3-569581.png';
    } else {
      logo = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${this.props.token}/logo.png`
    }
    this.setState({logo});
  }

  handleLogoError = () => {
    this.setState({logo: 'https://assets-global.website-files.com/5cb0ac9c57054973ac1bf1e4/5cd059557473d12c2ea50768_2165.png'});
  }

  render() {
    return(
      <li 
        onClick={() => this.props.setToken(
          this.props.token, 
          this.props.allTokens[this.props.token].symbol
        )}
        className="token-input__item">
        <img
          src={this.state.logo}
          alt="Logo"
          className="token-input__logo"
          onError={this.handleLogoError} />
        <div className="token-input__info">
          <p className="token-input__symbol">
            {this.props.allTokens[this.props.token].symbol}
          </p>
          <p className="token-input__name">
            {this.props.allTokens[this.props.token].name}
          </p>
        </div>
      </li>
    );
  }
}

export default TokenInput;