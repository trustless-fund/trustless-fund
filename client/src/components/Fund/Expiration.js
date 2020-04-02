import React, {Component} from 'react';

class Expiration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiration: null
    }

    this.getExpiration();
  }

  getExpiration = async () => {
    const expiration = await this.props.drizzle.contracts.TrustlessFund.methods.expiration().call();
    this.setState({expiration});
  }

  render() {
    return (
      <p className="fund__expiration">
        {/* TODO: Convert expiration to date */}
        <span className="fund__expiration--until">
          Lock Active Until:
        </span>
        {this.state.expiration}
      </p>
    );
  }
}

export default Expiration;