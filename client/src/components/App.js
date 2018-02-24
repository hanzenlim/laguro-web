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
import NewOffice from './NewOffice';
import NewListing from './NewListing';
import Profile from './Profile';

class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }

  render(){
    return (
      <div className="wc-main">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/dentists/search" component={DentistResultIndex} />
              <Route path="/offices/search" component={OfficeResultIndex} />
              <Route path="/offices/new" component={NewOffice} />
              <Route path="/listings/new" component={NewListing} />
              <Route path="/profile" component={Profile} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  };
};

export default connect(null, actions)(App);
