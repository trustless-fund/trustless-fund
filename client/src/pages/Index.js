import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as accountsActions from '../actions/accountsActions';
import * as factoryActions from '../actions/factoryActions';
import Form from '../components/Form';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: this.props.accounts.list[0],
      factory: this.props.factory,
      fundId: this.props.factory.fundId
    }
  }

  componentWillReceiveProps = (newProps) => {
    if(this.state.account !== newProps.accounts.list[0]) {
      this.setState({account: newProps.accounts.list[0]});
    }
    if(this.state.factory !== newProps.factory) {
      this.setState({factory: newProps.factory});
    }
  }

  render() {
    return (
      <div className="index">
        <h1>Trust Fund Factory</h1>
        {'Account: ' + this.state.account}
        <Form {...this.state} actions={this.props.actions} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    accounts: state.accounts,
    factory: state.factory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...accountsActions, ...factoryActions}, dispatch)
  };
}

Index.propTypes = {
  accounts: PropTypes.array.isRequired,
  factory: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
