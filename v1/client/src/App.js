import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Loadable from 'react-loadable';
import history from './history';

import HomePage from './pages/HomePage';
// import LoginModal from './components/LoginModal';
// import NotFound from './components/NotFound';

import Layout from './components/Layout';
import Content from './components/Content';
import Header from './pages/common/Header';
import Footer from './pages/common/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import theme from './components/theme';
import './App.css';

const LandlordLandingPage = Loadable({
    loader: () => import('./pages/LandlordLandingPage'),
    loading: () => null,
});

const DentistLandingPage = Loadable({
    loader: () => import('./pages/DentistLandingPage'),
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

const PaymentPage = Loadable({
    loader: () => import('./pages/Payment'),
    loading: () => null,
});

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router history={history}>
                    <Layout>
                        <Header />
                        <Content>
                            <ErrorBoundary>
                                <Switch>
                                    <Route
                                        path="/landlord"
                                        component={LandlordLandingPage}
                                    />
                                    <Route
                                        path="/dentist/search"
                                        component={DentistSearchPage}
                                    />
                                    <Route
                                        path="/dentist/:id"
                                        component={DentistDetailsPage}
                                    />
                                    <Route
                                        path="/dentist"
                                        component={DentistLandingPage}
                                    />
                                    <Route
                                        path="/office/search"
                                        component={OfficeSearchPage}
                                    />
                                    <Route
                                        path="/office/:id"
                                        component={OfficeDetailsPage}
                                    />
                                    <Route
                                        path="/office/:id"
                                        component={OfficeDetailsPage}
                                    />
                                    <Route
                                        path="/payment"
                                        component={PaymentPage}
                                    />
                                    <Route path="/" component={HomePage} />
                                    {/* Catch all unmatched routes. */}
                                    {/* <Route component={NotFound} /> */}
                                </Switch>
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
