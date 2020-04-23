import React, { Component } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import FundContainer from '../components/Fund/FundContainer';
import Nav from '../components/Shared/Nav';
import Footer from '../components/Shared/Footer';
import logo from '../assets/logo.png';

import TrustlessFundFactoryV2 from '../contracts/TrustlessFundFactoryV2.json';
import TrustlessFundFactoryV1 from '../contracts/TrustlessFundFactory.json';
import '../layout/components/loading.sass';

class Fund extends Component {
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
                <Nav 
                  drizzle={drizzle} 
                  drizzleState={drizzleState} />
                <FundContainer 
                  drizzle={drizzle} 
                  drizzleState={drizzleState} 
                  fundId={this.props.match.params.fundId}
                  version={this.props.match.params.version} />
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
