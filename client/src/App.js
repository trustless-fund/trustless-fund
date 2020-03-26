import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Index from './pages/Index';
import Fund from './pages/Fund';

// import './layout/config/_base.sass';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router basename="/">
          <Route 
            exact path="/" 
            component={Index}
          />
          <Route 
            path="/fund/:fundId" 
            component={Fund}
          />
        </Router>
      </div>
    );
  }
}

export default App;
