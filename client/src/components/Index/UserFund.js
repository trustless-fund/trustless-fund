import React, {Component} from 'react';

import link from '../../assets/link.svg';

class UserFund extends Component {
  render() {
    return (
      <a href={`/fund/${this.props.fund.id}`} className="user-funds__link">
        <li className="user-funds__fund">
          {this.props.fund.beneficiary} {this.props.fund.expiration} {this.props.fund.id}
          <img src={link} alt="Link icon" className="user-funds__icon" />
        </li>
      </a>
    );
  }
}

export default UserFund;