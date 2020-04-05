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
    if(this.props.target) {
      return (
        <a 
          href={`${this.props.link}`} 
          className={`hero__button hero__button--${this.props.class}`}
          target="_blank"
          rel="noopener noreferrer"
          >
          {this.props.text}
        </a>
      );
    }
    return (
      <a 
        href={`${this.props.link}`} 
        className={`hero__button hero__button--${this.props.class}`}
        >
        {this.props.text}
      </a>
    );
  }
}

export default Button;