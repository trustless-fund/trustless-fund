import React, {Component} from 'react';
import Nav from '../components/Shared/Nav';
import Footer from '../components/Shared/Footer';
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import logo from '../assets/logo.png';

import '../layout/components/loading.sass';

class FourOFour extends Component {
  constructor(props) {
    super(props);

    this.drizzle = new Drizzle({});
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
                <div className="invalid-fund">
                  <h2 className="invalid-fund__header">
                    Error
                  </h2>
                  <p className="invalid-fund__info">
                    This page doesn't seem to exist.
                    <a href="/" className="invalid-fund__link">
                      Go back to homepage.
                    </a>
                  </p>
                </div>
                <Footer drizzle={drizzle} drizzleState={drizzleState} />
              </>
            );
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    );
  }
} 

export default FourOFour;