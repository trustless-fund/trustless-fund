import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Index extends Component {
  render() {
    return (
      <div className="index">
        <h1>Trust Fund Factory</h1>
        {this.props.accounts}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    accounts: state.accounts
  };
}

Index.propTypes = {
  accounts: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Index);
