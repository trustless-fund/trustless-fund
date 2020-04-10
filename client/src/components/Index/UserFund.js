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
      <tr className="user-funds__table-row">
        <td className="user-funds__table-data">
          {`${this.props.fund.beneficiary.slice(0, 4)}...${this.props.fund.beneficiary.slice(this.props.fund.beneficiary.length - 4, this.props.fund.beneficiary.length)}`}
        </td> 
        <td className="user-funds__table-data">
          {this.toDate(this.props.fund.expiration)}
        </td>
        <td className="user-funds__table-data">
          {this.props.fund.id}
        </td>
        <td className="user-funds__table-data user-funds__table-data--link">
          <a href={`/fund/${this.props.fund.id}`} className="user-funds__link">
            <img src={link} alt="Link icon" className="user-funds__icon" />
          </a>
        </td>
      </tr>
    );
  }
}

export default UserFund;