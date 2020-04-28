import React, {Component} from 'react';
import Asset from './Asset';
import '../../layout/components/assets.sass';

class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAssets: this.props.userAssets
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({userAssets: nextProps.userAssets});
  }

  render() {
    return (
      <div className="assets">
        <div className="assets__details">
          <p className="assets__detail">
            Assets
          </p>
          <p className="assets__detail">
            Amount/USD
          </p>
        </div>
        {this.state.userAssets.length === 0 &&
          <p className="assets__empty">
            No assets yet... Click deposit to get started.
          </p>
        }
        <ul className="assets__list">
          {this.state.userAssets.map((token, i) => {
            if(token.balance > 0) {
              return (<Asset 
                key={i} 
                token={token} 
                allTokens={this.props.allTokens}
                drizzle={this.props.drizzle} />);
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    );
  }
}

export default Assets;