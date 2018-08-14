import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import * as actions from './actions';
import { DENTIST, PAYMENT_OPTIONS } from './util/strings';
import LoadingComponent from './components/LoadingComponent';
import history from './history';

import Landing from './components/Landing';
import HomePage from './Pages/HomePage';
import LoginModal from './components/LoginModal';
import NotFound from './components/NotFound';

import Layout from './components/Layout';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import theme from './components/theme';

import './components/App.css';

const LandlordOnboarding = Loadable({
    loader: () => import('./components/LandlordOnboarding'),
    loading: LoadingComponent
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
        isLoginModalVisible: state.ui.isLoginModalVisible
    };
}

export default App;

// export default connect(mapStateToProps, actions)(App);
