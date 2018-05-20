import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import * as actions from '../actions';
import LoadingComponent from './LoadingComponent';

import history from '../history';
import Landing from './Landing';
import Header from './Header';
import LoginModal from './LoginModal';
import { DENTIST } from '../util/strings';
import NotFound from './NotFound';

import './App.css';

const Cart = Loadable({
    loader: () => import("./Cart"),
    loading: LoadingComponent
});

const DentistResultIndex = Loadable({
    loader: () => import("./DentistResultIndex"),
    loading: LoadingComponent
});

const OfficeResultIndex = Loadable({
    loader: () => import("./OfficeResultIndex"),
    loading: LoadingComponent
});

const NewOffice = Loadable({
    loader: () => import("./forms/NewOffice"),
    loading: LoadingComponent
});

const EditOffice = Loadable({
    loader: () => import("./forms/EditOffice"),
    loading: LoadingComponent
});

const NewListing = Loadable({
    loader: () => import("./forms/NewListing"),
    loading: LoadingComponent
});

const EditListing = Loadable({
    loader: () => import("./forms/EditListing"),
    loading: LoadingComponent
});

const NewDentist = Loadable({
    loader: () => import("./forms/NewDentist"),
    loading: LoadingComponent
});

const EditDentist = Loadable({
    loader: () => import("./forms/EditDentist"),
    loading: LoadingComponent
});

const Profile = Loadable({
    loader: () => import("./Profile"),
    loading: LoadingComponent
});

const Dentist = Loadable({
    loader: () => import("./Dentist"),
    loading: LoadingComponent
});

const Listing = Loadable({
    loader: () => import("./Listing"),
    loading: LoadingComponent
});

const Office = Loadable({
    loader: () => import("./Office"),
    loading: LoadingComponent
});

const PrivateRoute = ({ auth, path, component: Component, ...props }) => (
    <Route
        render={() =>
            auth ? (
                <Component {...props} />
            ) : (
                <div className="center-align">
                    <p>
                        You must log in to view the page{' '}
                        {path ? `at ${path}` : ''}
                    </p>
                    <a
                        className="login waves-effect btn light-blue lighten-2"
                        href="/auth/google"
                    >
                        Login
                    </a>
                </div>
            )
        }
    />
);

class App extends Component {
    componentDidMount() {
        this.props.fetchUser(DENTIST);
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header 
                            toggleShowModal={this.props.toggleLoginModal}
                        />
                        <Switch>
                            <Route
                                path="/dentists/search"
                                component={DentistResultIndex}
                            />
                            <Route
                                path="/offices/search"
                                component={OfficeResultIndex}
                            />
                            <PrivateRoute
                                auth={this.props.auth}
                                path="/offices/:office_id/listings/:id/edit"
                                component={EditListing}
                            />
                            <Route
                                path="/offices/:office_id/listings/:id"
                                component={Listing}
                            />
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
                            <Route
                                path="/offices/:office_id"
                                component={Office}
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
                            {/* Catch all unmatched routes. */}
                            <Route component={NotFound} />
                        </Switch>
                        <LoginModal
                            open={this.props.isLoginModalVisible}
                            onClose={this.props.toggleLoginModal}
                        />
                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        isLoginModalVisible: state.ui.isLoginModalVisible,
    };
}

export default connect(mapStateToProps, actions)(App);
