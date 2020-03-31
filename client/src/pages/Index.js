import React, { Component } from "react";
import Form from '../components/Form';
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";

import TrustlessFund from '../contracts/TrustlessFund.json';
import TrustlessFundFactory from '../contracts/TrustlessFundFactory.json';
// import ERC20 from '../contracts/ERC20.json';

const drizzleOptions = {
  contracts: [
    TrustlessFund,
    TrustlessFundFactory,
    // ERC20
  ], 
  events: {
    TrustlessFund: [
      'Deposit',
      'Withdraw', 
      'IncreaseTime', 
      'UpdateBeneficiary'
    ],
    TrustlessFundFactory: [
      'CreateFund'
    ],
    // ERC20: [
    //   'Transfer',
    //   'Approval'
    // ]
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
                <h1>Trust Fund Factory</h1>
                <Form drizzle={drizzle} drizzleState={drizzleState} />
              </div>
            );
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    );
  }
}

export default Index;
