import React, {Component} from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.drizzleState.accounts[0]
    }
  }

  render() {
    return (
      <nav>
        <h1>Trustless Fund</h1>
        <button>
          {this.state.address ? 
            `${this.state.address.slice(0, 4)}...${this.state.address.slice(this.state.address.length - 4, this.state.address.length)}` : 
            'Connect Wallet'}
        </button>
      </nav>
    );
  }
}

export default Nav;