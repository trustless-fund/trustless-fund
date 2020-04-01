import React, {Component} from 'react';

class Asset extends Component {
  render() {
    return (
      <li>
        <p>
          Asset: {this.props.token.address}
          Balance: {this.props.token.balance}
        </p>
      </li>
    );
  }
}

export default Asset;