import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Index from './pages/Index';
import Fund from './pages/Fund';
import Factory from './pages/Factory';
import FourOFour from './pages/404';

import './layout/config/_base.sass';

class App extends Component {
  render() {
    return (
      <Router basename="/">
        <Switch>
          <Route 
            exact path="/" 
            component={Index}
          />
          <Route 
            path="/factory" 
            component={Factory}
          />
          <Route 
            path="/:version/fund/:fundId" 
            component={Fund}
          />
          <Route
            component={FourOFour}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
