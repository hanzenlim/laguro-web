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
import NewDentist from './NewDentist';
import EditDentist from './EditDentist';
import Profile from './Profile';
import Listing from './Listing';

const PrivateRoute = ({ auth, path, ...props, component: Component }) => (
  <Route
    render={() =>
      auth && auth.data ? (
        <Component {...props} />
      ) : (
        <div className="center-align">
          <p>You must log in to view the page {path ? "at " + path : ""}</p>
          <a className="login waves-effect btn light-blue lighten-2" href="/auth/google">Login</a>
        </div>
      )
    }
  />
);

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
              <Route path="/offices/:office_id/listings/:id" component={Listing} />
              <PrivateRoute
                auth={this.props.auth}
                path="/offices/new"
                component={NewOffice}
              />
              <PrivateRoute
                auth={this.props.auth}
                path="/dentist/new"
                component={NewDentist}
              />
              <PrivateRoute
                auth={this.props.auth}
                path="/dentist/edit"
                component={EditDentist}
              />
              <PrivateRoute
                auth={this.props.auth}
                path="/listings/new"
                component={NewListing}
              />
              <PrivateRoute
                auth={this.props.auth}
                path="/profile"
                component={Profile}
              />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(App);
