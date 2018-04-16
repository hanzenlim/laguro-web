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
import NewOffice from './forms/NewOffice';
import EditOffice from './forms/EditOffice';
import NewListing from './forms/NewListing';
import EditListing from './forms/EditListing';
import NewDentist from './forms/NewDentist';
import EditDentist from './forms/EditDentist';
import Profile from './Profile';
import Dentist from './Dentist';
import Listing from './Listing';
import Office from './Office';
import Cart from './Cart';

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
      <div>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/dentists/search" component={DentistResultIndex} />
              <Route path="/offices/search" component={OfficeResultIndex} />
              <PrivateRoute
                auth={this.props.auth}
                path="/offices/:office_id/listings/:id/edit"
                component={EditListing}
              />
              <Route path="/offices/:office_id/listings/:id" component={Listing} />
              <PrivateRoute
                auth={this.props.auth}
                path="/offices/:office_id/edit"
                component={EditOffice}
              />
              <PrivateRoute
                auth={this.props.auth}
                path="/offices/new"
                component={NewOffice}
              />
              <Route path="/offices/:office_id" component={Office} />
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
              <Route path="/dentist/:id" component={Dentist} />
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
              <PrivateRoute
                auth={this.props.auth}
                path="/cart"
                component={Cart}
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
