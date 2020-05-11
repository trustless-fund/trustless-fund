import React, {Component} from 'react';

import '../../layout/components/invalidfund.sass';

class NoWeb3 extends Component {
  render() {
    return (
      <div className="invalid-fund">
        <h2 className="invalid-fund__header">
          No Wallet Connected
        </h2>
        <p className="invalid-fund__info">
          You must have a web3 wallet connected to view this page.
          <a href="https://metamask.io/" className="invalid-fund__link">
            Download Metamask.
          </a>
        </p>
      </div>
    );
  }
}

export default NoWeb3;