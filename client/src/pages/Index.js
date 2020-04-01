import React, { Component } from "react";
import UserFunds from '../components/Index/UserFunds';
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
                <h4>Lock in the Time-Value of Your Money</h4>
                <a href="/">Learn More</a>
                <a href="/factory">Create Fund</a>
                <UserFunds drizzle={drizzle} drizzleState={drizzleState} />
              </div>
            );
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    );
  }
}

export default Index;
