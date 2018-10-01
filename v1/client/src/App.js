import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Loadable from 'react-loadable';
import ReactGA from 'react-ga';
import withTracker from './util/analytics';
import history from './history';

import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import Content from './components/Content';
import Header from './pages/common/Header';
import Footer from './pages/common/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import './Silka.css';
import theme from './components/theme';
import './App.css';

const ProfilePage = Loadable({
    loader: () => import('./pages/ProfilePage'),
    loading: () => null,
});

const DentistSearchPage = Loadable({
    loader: () => import('./pages/DentistSearchPage'),
    loading: () => null,
});

const OfficeSearchPage = Loadable({
    loader: () => import('./pages/OfficeSearchPage'),
    loading: () => null,
});

const DentistDetailsPage = Loadable({
    loader: () => import('./pages/DentistDetailsPage'),
    loading: () => null,
});

const OfficeDetailsPage = Loadable({
    loader: () => import('./pages/OfficeDetailsPage'),
    loading: () => null,
});

const ResetPassPage = Loadable({
    loader: () => import('./pages/ResetPassPage'),
    loading: () => null,
});

const HostOnboarding = Loadable({
    loader: () => import('./pages/HostOnboarding'),
    loading: () => null,
});

const ConsentAndPaymentPage = Loadable({
    loader: () => import('./pages/ConsentAndPaymentPage'),
    loading: () => null,
});

const Error404Page = Loadable({
    loader: () => import('./pages/Error404Page'),
    loading: () => null,
});

const GeneralErrorPage = Loadable({
    loader: () => import('./pages/GeneralErrorPage'),
    loading: () => null,
});
const LoginPage = Loadable({
    loader: () => import('./pages/LoginPage'),
    loading: () => null,
});

const initializeGoogleAnalytics = () => {
    ReactGA.initialize('UA-126544900-1');
};

const getIdQueryClient = gql`
    {
        activeUser @client {
            id
        }
        visibleModal @client
    }
`;

const PrivateRoute = ({
    isUserLoggedin,
    component: ComponentToBeRendered,
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            isUserLoggedin ? (
                <ComponentToBeRendered {...props} />
            ) : (
                <Redirect
                    preserveQueryString
                    to={{
                        pathname: '/login',
                        search: `?redirectTo=${props.location.pathname}`,
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
);

class App extends Component {
    render() {
        initializeGoogleAnalytics();
        return (
            <ThemeProvider theme={theme}>
                <Router history={history}>
                    <Layout>
                        <Header />
                        <Content>
                            <ErrorBoundary>
                                <Query query={getIdQueryClient}>
                                    {({ data }) => (
                                        <Switch>
                                            <Route
                                                path="/login"
                                                component={withTracker(
                                                    LoginPage
                                                )}
                                            />
                                            <PrivateRoute
                                                path="/host-onboarding/:step"
                                                component={withTracker(
                                                    HostOnboarding
                                                )}
                                                isUserLoggedin={data.activeUser}
                                            />
                                            <PrivateRoute
                                                path="/consent-and-payment"
                                                component={withTracker(
                                                    ConsentAndPaymentPage
                                                )}
                                                isUserLoggedin={data.activeUser}
                                            />
                                            <PrivateRoute
                                                path="/profile"
                                                component={withTracker(
                                                    ProfilePage
                                                )}
                                                isUserLoggedin={data.activeUser}
                                            />
                                            <Route
                                                path="/dentist/search"
                                                component={withTracker(
                                                    DentistSearchPage
                                                )}
                                            />
                                            <Route
                                                path="/dentist/:id"
                                                component={withTracker(
                                                    DentistDetailsPage
                                                )}
                                            />
                                            <Route
                                                path="/office/search"
                                                component={withTracker(
                                                    OfficeSearchPage
                                                )}
                                            />
                                            <Route
                                                path="/office/:id"
                                                component={withTracker(
                                                    OfficeDetailsPage
                                                )}
                                            />
                                            <Route
                                                path="/reset-password"
                                                component={withTracker(
                                                    ResetPassPage
                                                )}
                                            />
                                            <Route
                                                path="/error"
                                                component={withTracker(
                                                    GeneralErrorPage
                                                )}
                                            />
                                            <Route
                                                path="/"
                                                exact
                                                component={withTracker(
                                                    HomePage
                                                )}
                                            />
                                            <Route
                                                component={withTracker(
                                                    Error404Page
                                                )}
                                            />
                                        </Switch>
                                    )}
                                </Query>
                            </ErrorBoundary>
                        </Content>
                        <Footer />
                    </Layout>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;
