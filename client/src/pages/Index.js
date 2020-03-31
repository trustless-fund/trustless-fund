import React, { Component } from "react";
import Form from '../components/Form';

class Index extends Component {
  render() {
    return (
      <div className="index">
        <h1>Trust Fund Factory</h1>
        <Form {...this.state} />
      </div>
    );
  }
}

export default Index;
