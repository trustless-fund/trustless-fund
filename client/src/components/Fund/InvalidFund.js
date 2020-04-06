import React, {Component} from 'react';

import '../../layout/components/invalidfund.sass';

class InvalidFund extends Component {
  render() {
    return (
      <div className="invalid-fund">
        <h2 className="invalid-fund__header">
          Error
        </h2>
        <p className="invalid-fund__info">
          This fund doesn't seem to exist.
          <a href="/" className="invalid-fund__link">
            Go back to homepage.
          </a>
        </p>
      </div>
    );
  }
}

export default InvalidFund;