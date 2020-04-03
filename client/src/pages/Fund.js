import React, { Component } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import FundContainer from '../components/Fund/FundContainer';
import Nav from '../components/Shared/Nav';
import Footer from '../components/Shared/Footer';

import TrustlessFundFactory from '../contracts/TrustlessFundFactory.json';
// import ERC20 from '../contracts/ERC20.json';

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

class Fund extends Component {
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
              <>
                <Nav drizzle={drizzle} drizzleState={drizzleState} />
                <FundContainer 
                  drizzle={drizzle} 
                  drizzleState={drizzleState} 
                  fundId={this.props.match.params.fundId} />
                <Footer drizzle={drizzle} drizzleState={drizzleState} />
              </>
            );
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    );
  }
}

export default Fund;
