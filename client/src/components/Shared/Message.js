import React, {Component} from 'react';

import '../../layout/components/message.sass';

class Message extends Component {
  render() {
    if(this.props.message) {
      if(this.props.drizzleState.web3.networkId === 1) {
        return(
          <a 
            className="message"
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.txHash ? `http://etherscan.io/tx/${this.props.txHash}` : null}
          >
            {this.props.message}
          </a>
        );
      }
      if(this.props.drizzleState.web3.networkId === 3) {
        return(
          <a 
            className="message"
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.txHash ? `http://ropsten.etherscan.io/tx/${this.props.txHash}` : null}
          >
            {this.props.message}
          </a>
        );
      }
      if(this.props.drizzleState.web3.networkId === 4) {
        return(
          <a 
            className="message"
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.txHash ? `http://rinkeby.etherscan.io/tx/${this.props.txHash}` : null}
          >
            {this.props.message}
          </a>
        );
      }
      if(this.props.drizzleState.web3.networkId === 5) {
        return(
          <a 
            className="message"
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.txHash ? `http://goerli.etherscan.io/tx/${this.props.txHash}` : null}
          >
            {this.props.message}
          </a>
        );
      }
      if(this.props.drizzleState.web3.networkId === 42) {
        return(
          <a 
            className="message"
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.txHash ? `http://kovan.etherscan.io/tx/${this.props.txHash}` : null}
          >
            {this.props.message}
          </a>
        );
      } else {
        return(
          <p className="message">
            {this.props.message}
          </p>
        );
      }
    }
    return null;
  }
}

export default Message;