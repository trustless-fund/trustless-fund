import React, {Component} from 'react';

class TokenInput extends Component {
  render() {
    return(
      <li onClick={() => this.props.setToken(this.props.token, this.props.allTokens[this.props.token].symbol)}>
        {this.props.allTokens[this.props.token].symbol}
      </li>
    );
  }
}

export default TokenInput;