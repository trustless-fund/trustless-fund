import React, { Component } from "react";

class Fund extends Component {
  state = {
    fundId: null
  }

  componentDidMount = () => {
    const fundId = this.props.match.params.fundId;
    this.setState({fundId});
  }

  render() {
    return (
      <div className="fund">
        <h1>Trust Fund</h1>
      </div>
    );
  }
}

export default Fund;
