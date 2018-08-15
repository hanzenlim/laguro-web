import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import * as actions from './actions';
import { DENTIST, PAYMENT_OPTIONS } from './util/strings';
import LoadingComponent from './legacyComponents/LoadingComponent';
import history from './history';

import Landing from './legacyComponents/Landing';
import HomePage from './pages/HomePage';
import LoginModal from './legacyComponents/LoginModal';
import NotFound from './legacyComponents/NotFound';

import Layout from './legacyComponents/Layout';
import Header from './legacyComponents/Header';
import Content from './legacyComponents/Content';
import Footer from './legacyComponents/Footer';
import ErrorBoundary from './legacyComponents/ErrorBoundary';

import theme from './components/theme';

// import './components/App.css';

const LandlordOnboarding = Loadable({
    loader: () => import('./legacyComponents/LandlordOnboarding'),
    loading: LoadingComponent,
});

const DentistSearchPage = Loadable({
    loader: () => import('./pages/DentistSearchPage'),
    loading: LoadingComponent,
});

const PrivateRoute = ({ auth, path, component: Component, ...props }) => {
    const { toggleLoginModal } = props;

    return (
        <Route
            render={() =>
                auth ? (
                    <Component {...props} />
                ) : (
                    <div className="center-align stretch_height">
                        <p>You must log in to view the page</p>
                        <div
                            onClick={toggleLoginModal}
                            className="login waves-effect btn light-blue lighten-2"
                        >
                            Login
                        </div>
                    </div>
                )
            }
        />
    );
};

class App extends Component {
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
                                        toggleLoginModal={
                                            this.props.toggleLoginModal
                                        }
                                    />
                                    <Route
                                        path="/search-dentist"
                                        component={DentistSearchPage}
                                    />
                                    <Route path="/" component={HomePage} />

                                    {/* Catch all unmatched routes. */}
                                    <Route component={NotFound} />
                                </Switch>
                            </Content>
                        </ErrorBoundary>
                        <LoginModal
                            open={this.props.isLoginModalVisible}
                            closeModal={this.props.toggleLoginModal}
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

export default App;

// export default connect(mapStateToProps, actions)(App);
