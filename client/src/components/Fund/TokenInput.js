import React, {Component} from 'react';

import '../../layout/components/tokeninput.sass';

class TokenInput extends Component {
  render() {
    return(
      <li 
        onClick={() => this.props.setToken(
          this.props.token, 
          this.props.allTokens[this.props.token].symbol
        )}
        className="token-input__item">
        <img
          src={this.props.allTokens[this.props.token].logo}
          alt="Logo"
          className="token-input__logo" />
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