import React, {Component} from 'react';

class InvalidFund extends Component {
  render() {
    return (
      <div>
        <h2>
          Error
        </h2>
        <p>
          This fund doesn't seem to exist. Are you sure you have the correct URL?
        </p>
      </div>
    );
  }
}

export default InvalidFund;