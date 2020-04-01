import React, { Component } from "react";
import CreateFundForm from '../components/CreateFundForm';
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";

import TrustlessFundFactory from '../contracts/TrustlessFundFactory.json';

const drizzleOptions = {
  contracts: [
    TrustlessFundFactory
  ], 
  events: {
    TrustlessFundFactory: [
      'CreateFund'
    ]
  }
}

const drizzle = new Drizzle(drizzleOptions);

class Index extends Component {
  render() {
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          {drizzleContext => {
            const {drizzle, drizzleState, initialized} = drizzleContext;

            if(!initialized) {
              return "Loading..."
            }

            return(
              <div className="index">
                <h1>Deploy a Trustless Fund</h1>
                <CreateFundForm drizzle={drizzle} drizzleState={drizzleState} />
              </div>
            );
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    );
  }
}

export default Index;