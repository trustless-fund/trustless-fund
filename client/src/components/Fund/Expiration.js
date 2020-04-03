import React, {Component} from 'react';

class Expiration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiration: null
    }

    this.getExpiration();
  }

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  getExpiration = async () => {
    const expiration = await this.props.drizzle.contracts.TrustlessFund.methods.expiration().call();
    const dateObject = new Date(expiration * 1000);
    const monthNum = dateObject.getUTCMonth();
    const month = this.months[monthNum];
    const date = dateObject.getUTCDate();
    const year = dateObject.getUTCFullYear();
    const fullDate = `${month} ${date}, ${year}`;
    this.setState({expiration: fullDate});
  }

  render() {
    return (
      <p className="fund__expiration">
        {/* TODO: If lock already expired, display 'Unlocked' */}
        <span className="fund__expiration--until">
          Lock Active Until:
        </span>
        {this.state.expiration}
      </p>
    );
  }
}

export default Expiration;