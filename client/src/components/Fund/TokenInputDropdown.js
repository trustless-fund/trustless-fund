import React, {Component} from 'react';
import TokenInput from './TokenInput';

import '../../layout/components/tokeninput.sass';

class TokenInputDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchToken: this.props.searchToken
    }
  }

  componentWillReceiveProps = async (nextProps) => {
    await this.setState({searchToken: nextProps.searchToken});
  }

  render() {
    return (
      <div className="token-input">
        <input 
          type="text"
          className="token-input__search"
          placeholder="Search"
          onChange={this.props.handleSearchTokenChange}
          value={this.state.searchToken}
        />
        <ul className="token-input__dropdown">
          {this.props.tokenList && this.props.tokenList.map((token, i) => {
            return (<TokenInput 
              key={i} 
              token={token} 
              allTokens={this.props.allTokens}
              setToken={this.props.setToken} />);
          })}
        </ul>
      </div>
    );
  }
}

export default TokenInputDropdown;