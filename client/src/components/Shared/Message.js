import React, {Component} from 'react';
import {getEtherscanLink} from '../../utils/helpers';

import '../../layout/components/message.sass';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      etherscan: null
    }
  }

  componentWillReceiveProps = async () => {
    const etherscan = await getEtherscanLink(this.props.networkId, `/tx/${this.props.txHash}`);
    this.setState({etherscan});
  }
 
  render() {
    if(this.props.message) {
      if(this.props.networkId) {
        return(
          <a 
            className={`message${this.props.error ? ' message--error' : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.txHash ? this.state.etherscan : null}
          >
            {this.props.message}
          </a>
        );
      } else {
        return(
          <p className={`message${this.props.error ? ' message--error' : ''}`}>
            {this.props.message}
          </p>
        );
      }
    }
    return null;
  }
}

export default Message;