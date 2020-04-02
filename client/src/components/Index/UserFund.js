import React, {Component} from 'react';

import link from '../../assets/link.svg';

class UserFund extends Component {
  render() {
    return (
      <a href={`/fund/${this.props.id}`} className="user-funds__link">
        <li className="user-funds__fund">
          Fund {this.props.id}
          <img src={link} alt="Link icon" className="user-funds__icon" />
        </li>
      </a>
    );
  }
}

export default UserFund;