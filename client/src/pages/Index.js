import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as accountsActions from '../actions/accountsActions';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: this.props.accounts[0]
    }
  }

  componentDidMount = () => {
    this.props.actions.loadAccounts();

    window.ethereum.on('accountsChanged', (accounts) => {
      this.setState({account: accounts[0]});
    });
  }

  componentWillReceiveProps = (newProps) => {
    if(this.state.account !== newProps.accounts[0]) {
      this.setState({account: newProps.accounts[0]});
    }
  }

  render() {
    return (
      <div className="index">
        <h1>Trust Fund Factory</h1>
        {this.state.account}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(accountsActions, dispatch)
  };
}

Index.propTypes = {
  accounts: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
