import React, {Component} from 'react';

import '../../layout/components/button.sass';

class Button extends Component {
  render() {
    if(this.props.button) {
      return (
        <button className={`hero__button hero__button--${this.props.class}`}>
          {this.props.text}
        </button>
      );
    }
    return (
      <a href={`${this.props.link}`} className={`hero__button hero__button--${this.props.class}`}>
        {this.props.text}
      </a>
    );
  }
}

export default Button;