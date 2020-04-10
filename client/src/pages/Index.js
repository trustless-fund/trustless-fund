import React, { Component } from "react";
import UserFunds from '../components/Index/UserFunds';
import Hero from '../components/Index/Hero';
import Nav from '../components/Shared/Nav';
import Footer from '../components/Shared/Footer';
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
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

let drizzle = new Drizzle(drizzleOptions);

class Index extends Component {
  render() {
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          {drizzleContext => {
            const {drizzle, drizzleState, initialized} = drizzleContext;

            if(!initialized) {
              return (
                <div className="loading">
                  <img src={logo} alt="Trustless Fund" className="loading__image" />
                </div>
              );
            }

            return(
              <>
                <Nav drizzle={drizzle} drizzleState={drizzleState} />
                <Hero drizzle={drizzle} drizzleState={drizzleState} />
                <UserFunds drizzle={drizzle} drizzleState={drizzleState} />
                <Footer drizzle={drizzle} drizzleState={drizzleState} />
              </>
            );
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    );
  }
}

export default Index;
