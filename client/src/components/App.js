import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history'
import { connect } from 'react-redux';
import * as actions from '../actions';

// //components
import Landing from './Landing';
import DentistResultIndex from './DentistResultIndex';
import OfficeResultIndex from './OfficeResultIndex';
import Header from './Header';

class App extends Component {

  render(){
    return (
      <div className="wc-main">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/dentist/search" component={DentistResultIndex} />
              <Route path="/office/search" component={OfficeResultIndex} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  };
};

export default connect(null, actions)(App);
