import React, {Component} from 'react';

class UserFund extends Component {
  render() {
    return (
      <a href={`/fund/${this.props.id}`}>
        <li>
          Fund {this.props.id}
        </li>
      </a>
    );
  }
}

export default UserFund;