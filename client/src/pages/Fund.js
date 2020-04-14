import React, { Component } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import FundContainer from '../components/Fund/FundContainer';
import Nav from '../components/Shared/Nav';
import Footer from '../components/Shared/Footer';
import logo from '../assets/logo.png';

import TrustlessFundFactory from '../contracts/TrustlessFundFactory.json';
import '../layout/components/loading.sass';

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

            if(window.ethereum && !initialized) {
              return (
                <div className="loading">
                  <img src={logo} alt="Trustless Fund" className="loading__image" />
                </div>
              );
            }

            return(
              <>
                <Nav 
                  drizzle={drizzle} 
                  drizzleState={drizzleState} />
                <FundContainer 
                  drizzle={drizzle} 
                  drizzleState={drizzleState} 
                  fundId={this.props.match.params.fundId} />
                <Footer 
                  drizzle={drizzle} 
                  drizzleState={drizzleState} />
              </>
            );
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    );
  }
}

export default Fund;
