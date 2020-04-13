import React, {Component} from 'react';

import '../../layout/components/warning.sass'

class Warning extends Component {
  render() {
    return (
      <div className={`warning ${this.props.className}`}>
        <p className="warning__message">
          {this.props.message}
        </p>
      </div>
    );
  }
}

export default Warning;