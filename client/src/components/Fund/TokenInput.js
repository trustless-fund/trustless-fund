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
        {this.props.allTokens[this.props.token].symbol}
      </li>
    );
  }
}

export default TokenInput;