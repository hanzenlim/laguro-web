import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import * as actions from '../actions';
import { DENTIST } from '../util/strings';
import LoadingComponent from './LoadingComponent';
import history from '../history';

import Landing from './Landing';
import LoginModal from './LoginModal';
import NotFound from './NotFound';

import Layout from './Layout';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';

import theme from '../theme';

import './App.css';

const DentistResultIndex = Loadable({
    loader: () => import('./DentistResultIndex'),
    loading: LoadingComponent
});

const OfficeResultIndex = Loadable({
    loader: () => import('./OfficeResultIndex'),
    loading: LoadingComponent
});

const NewOffice = Loadable({
    loader: () => import('./forms/NewOffice'),
    loading: LoadingComponent
});

const EditOffice = Loadable({
    loader: () => import('./forms/EditOffice'),
    loading: LoadingComponent
});

const NewListing = Loadable({
    loader: () => import('./forms/NewListing'),
    loading: LoadingComponent
});

const EditListing = Loadable({
    loader: () => import('./forms/EditListing'),
    loading: LoadingComponent
});

const NewDentist = Loadable({
    loader: () => import('./forms/NewDentist'),
    loading: LoadingComponent
});

const EditDentist = Loadable({
    loader: () => import('./forms/EditDentist'),
    loading: LoadingComponent
});

const Profile = Loadable({
    loader: () => import('./Profile'),
    loading: LoadingComponent
});

const Dentist = Loadable({
    loader: () => import('./DetailsPage/Dentist'),
    loading: LoadingComponent
});

const Office = Loadable({
    loader: () => import('./DetailsPage/Office'),
    loading: LoadingComponent
});

const Payment = Loadable({
    loader: () => import('./Payment'),
    loading: LoadingComponent
});

const PaymentSuccess = Loadable({
    loader: () => import('./PaymentSuccess'),
    loading: LoadingComponent
});

const PaymentHistory = Loadable({
    loader: () => import('./PaymentHistory'),
    loading: LoadingComponent
});

const LandlordOnboarding = Loadable({
    loader: () => import('./LandlordOnboarding'),
    loading: LoadingComponent
});

const Payout = Loadable({
    loader: () => import('./Payout'),
    loading: LoadingComponent
});

const Terms = Loadable({
    loader: () => import('./Terms'),
    loading: LoadingComponent
});

const PrivacyPolicy = Loadable({
    loader: () => import('./PrivacyPolicy'),
    loading: LoadingComponent
});

const PrivateRoute = ({ auth, path, component: Component, ...props }) => (
    <Route
        render={() =>
            auth ? (
                <Component {...props} />
            ) : (
                <div className="center-align stretch_height">
                    <p>You must log in to view the page</p>
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
            <ThemeProvider theme={theme}>
                <Router history={history}>
                    <Layout>
                        <Header toggleShowModal={this.props.toggleLoginModal} />
                        <ErrorBoundary>
                            <Content>
                                <Switch>
                                    <PrivateRoute
                                        path="/landlord-onboarding/:step"
                                        auth={this.props.auth}
                                        component={LandlordOnboarding}
                                    />
                                    <PrivateRoute
                                        auth={this.props.auth}
                                        path="/office/:office_id/listing/:id/edit"
                                        component={EditListing}
                                    />
                                    <PrivateRoute
                                        auth={this.props.auth}
                                        path="/office/:office_id/edit"
                                        component={EditOffice}
                                    />
                                    <PrivateRoute
                                        auth={this.props.auth}
                                        path="/office/new"
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
                                        path="/listing/new"
                                        component={NewListing}
                                    />
                                    <PrivateRoute
                                        auth={this.props.auth}
                                        path="/profile"
                                        component={Profile}
                                    />
                                    <PrivateRoute
                                        auth={this.props.auth}
                                        path="/payment-success"
                                        component={PaymentSuccess}
                                    />
                                    <PrivateRoute
                                        auth={this.props.auth}
                                        path="/payment"
                                        component={Payment}
                                    />
                                    <PrivateRoute
                                        auth={this.props.auth}
                                        path="/payment-history"
                                        component={PaymentHistory}
                                    />
                                    <PrivateRoute
                                        auth={this.props.auth}
                                        path="/payout"
                                        component={Payout}
                                    />
                                    <Route
                                        path="/dentist/search"
                                        component={DentistResultIndex}
                                    />
                                    <Route
                                        path="/dentist/:id"
                                        component={Dentist}
                                    />
                                    <Route
                                        path="/office/search"
                                        component={OfficeResultIndex}
                                    />
                                    <Route
                                        path="/office/:office_id"
                                        component={Office}
                                    />
                                    <Route path="/terms" component={Terms} />
                                    <Route
                                        path="/privacy"
                                        component={PrivacyPolicy}
                                    />
                                    <Route path="/" component={Landing} />
                                    {/* Catch all unmatched routes. */}
                                    <Route component={NotFound} />
                                </Switch>
                            </Content>
                        </ErrorBoundary>
                        <LoginModal
                            open={this.props.isLoginModalVisible}
                            onClose={this.props.toggleLoginModal}
                        />
                        <Footer />
                    </Layout>
                </Router>
            </ThemeProvider>
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
