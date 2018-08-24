import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Loadable from 'react-loadable';
import LoadingComponent from './components/LoadingComponent';
import history from './history';

import HomePage from './pages/HomePage';
import LoginModal from './legacyComponents/LoginModal';
import NotFound from './legacyComponents/NotFound';

import Layout from './components/Layout';
import Content from './components/Content';
import Header from './pages/common/Header';
import Footer from './pages/common/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import theme from './components/theme';
import './App.css';

const DentistSearchPage = Loadable({
    loader: () => import('./pages/DentistSearchPage'),
    loading: LoadingComponent,
});

const OfficeSearchPage = Loadable({
    loader: () => import('./pages/OfficeSearchPage'),
    loading: LoadingComponent,
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
                                        path="/dentist/search"
                                        component={DentistSearchPage}
                                    />
                                    <Route
                                        path="/office/search"
                                        component={OfficeSearchPage}
                                    />
                                    <Route path="/" component={HomePage} />

                                    {/* Catch all unmatched routes. */}
                                    <Route component={NotFound} />
                                </Switch>
                                <LoginModal
                                    open={this.props.isLoginModalVisible}
                                    closeModal={this.props.toggleLoginModal}
                                />
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
