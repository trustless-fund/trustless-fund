import React, {Component} from 'react';

class TokenInput extends Component {
  render() {
    return(
      <li>{this.props.allTokens[this.props.token].symbol}</li>
    );
  }
}

export default TokenInput;