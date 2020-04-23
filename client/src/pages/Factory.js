import React, { Component } from "react";
import FactoryContainer from '../components/Factory/FactoryContainer';
import Nav from '../components/Shared/Nav';
import Footer from '../components/Shared/Footer';
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import logo from '../assets/logo.png';

import TrustlessFundFactoryV2 from '../contracts/TrustlessFundFactoryV2.json';
import TrustlessFundFactoryV1 from '../contracts/TrustlessFundFactory.json';
import '../layout/components/loading.sass';

class Factory extends Component {
  constructor(props) {
    super(props);

    let drizzleOptions

    if(this.props.match.params.version === 'v1') {
      drizzleOptions = {
        contracts: [
          TrustlessFundFactoryV1
        ], 
        events: {
          TrustlessFundFactoryV1: [
            'CreateFund'
          ]
        }
      }
    } else if(this.props.match.params.version === 'v2') {
      drizzleOptions = {
        contracts: [
          TrustlessFundFactoryV2
        ], 
        events: {
          TrustlessFundFactoryV2: [
            'CreateFund'
          ]
        }
      }
    } else {
      // TODO: Set error state and render error component
    }

    this.drizzle = new Drizzle(drizzleOptions);
  }

  render() {
    return (
      <DrizzleContext.Provider drizzle={this.drizzle}>
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
                <Nav drizzle={drizzle} drizzleState={drizzleState} />
                <FactoryContainer 
                  drizzle={drizzle} drizzleState={drizzleState} />
                <Footer drizzle={drizzle} drizzleState={drizzleState} />
              </>
            );
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    );
  }
}

export default Factory;
