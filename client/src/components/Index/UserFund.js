import React, {Component} from 'react';

import link from '../../assets/link.svg';

class UserFund extends Component {
  toDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  render() {
    return (
      <a href={`/fund/${this.props.fund.id}`} className="user-funds__link">
        <li className="user-funds__fund">
          <p className="user-funds__value">
            {`${this.props.fund.beneficiary.slice(0, 4)}...${this.props.fund.beneficiary.slice(this.props.fund.beneficiary.length - 4, this.props.fund.beneficiary.length)}`}
          </p> 
          <p className="user-funds__value">
            {this.toDate(this.props.fund.expiration)}
          </p>
          <p className="user-funds__value">
            {this.props.fund.id}
          </p>
          <img src={link} alt="Link icon" className="user-funds__icon" />
        </li>
      </a>
    );
  }
}

export default UserFund;