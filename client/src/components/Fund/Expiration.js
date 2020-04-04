import React, {Component} from 'react';

class Expiration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiration: null,
      isExpired: false
    }

    this.getExpiration();
    this.isExpired();
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
    const expiration = await this.props.fund.methods.expiration().call();
    const dateObject = new Date(expiration * 1000);
    const monthNum = dateObject.getUTCMonth();
    const month = this.months[monthNum];
    const date = dateObject.getUTCDate();
    const year = dateObject.getUTCFullYear();
    const fullDate = `${month} ${date}, ${year}`;
    this.setState({expiration: fullDate});
  }

  isExpired = async () => {
    const expiration = await this.props.fund.methods.expiration().call();
    // Source: https://electrictoolbox.com/unix-timestamp-javascript/
    const ts = Math.round((new Date()).getTime() / 1000);

    if(expiration < ts) {
      this.setState({isExpired: true});
    }
  }

  render() {
    if(this.state.isExpired) {
      return (
        <p className="fund__expiration fund__expiration--unlocked">
          Fund Unlocked
        </p>
      );
    }

    return (
      <p className="fund__expiration">
        <span className="fund__expiration--until">
          Lock Active Until:
        </span>
        {this.state.expiration}
      </p>
    );
  }
}

export default Expiration;