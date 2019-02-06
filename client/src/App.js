import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Loadable from 'react-loadable';

import history from './history';
import Layout from './components/Layout';
import Content from './components/Content';
import Footer from './pages/common/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import './Silka.css';
import theme from './components/theme';
import './App.css';

const Header = Loadable({
    loader: () =>
        import('./pages/common/Header' /* webpackChunkName: "header" */),
    loading: () => null,
});

const HomePage = Loadable({
    loader: () => import('./pages/HomePage' /* webpackChunkName: "homePage" */),
    loading: () => null,
});

const ProfilePage = Loadable({
    loader: () =>
        import('./pages/ProfilePage' /* webpackChunkName: "profilePage" */),
    loading: () => null,
});

const DentistSearchPage = Loadable({
    loader: () =>
        import('./pages/DentistSearchPage' /* webpackChunkName: "dentistSearchPage" */),
    loading: () => null,
});

const OfficeSearchPage = Loadable({
    loader: () =>
        import('./pages/OfficeSearchPage' /* webpackChunkName: "officeSearchPage" */),
    loading: () => null,
});

const DentistDetailsPage = Loadable({
    loader: () =>
        import('./pages/DentistDetailsPage' /* webpackChunkName: "dentistDetailsPage" */),
    loading: () => null,
});

const OfficeDetailsPage = Loadable({
    loader: () =>
        import('./pages/OfficeDetailsPage' /* webpackChunkName: "officeDetailsPage" */),
    loading: () => null,
});

const ResetPassPage = Loadable({
    loader: () =>
        import('./pages/ResetPassPage' /* webpackChunkName: "resetPassPage" */),
    loading: () => null,
});

const HostOnboarding = Loadable({
    loader: () =>
        import('./pages/HostOnboarding' /* webpackChunkName: "hostOnboarding" */),
    loading: () => null,
});

const ConsentAndPaymentPage = Loadable({
    loader: () =>
        import('./pages/ConsentAndPaymentPage' /* webpackChunkName: "consentAndPaymentPage" */),
    loading: () => null,
});

const ProcedurePaymentRequestPage = Loadable({
    loader: () =>
        import('./pages/ProcedurePaymentRequestPage' /* webpackChunkName: "procedurePaymentRequestPage" */),
    loading: () => null,
});

const Error404Page = Loadable({
    loader: () =>
        import('./pages/Error404Page' /* webpackChunkName: "error404Page" */),
    loading: () => null,
});

const GeneralErrorPage = Loadable({
    loader: () =>
        import('./pages/GeneralErrorPage' /* webpackChunkName: "generalErrorPage" */),
    loading: () => null,
});

const LoginPage = Loadable({
    loader: () =>
        import('./pages/LoginPage' /* webpackChunkName: "loginPage" */),
    loading: () => null,
});

const registerPage = Loadable({
    loader: () =>
        import('./pages/RegisterPage' /* webpackChunkName: "registerPage" */),
    loading: () => null,
});
const forgotPasswordPage = Loadable({
    loader: () =>
        import('./pages/ForgotPasswordPage' /* webpackChunkName: "forgotPasswordPage" */),
    loading: () => null,
});

const AboutPage = Loadable({
    loader: () =>
        import('./pages/AboutPage' /* webpackChunkName: "aboutPage" */),
    loading: () => null,
});

const CountdownPage = Loadable({
    loader: () =>
        import('./pages/CountdownPage' /* webpackChunkName: "countdownPage" */),
    loading: () => null,
});

const TermsPage = Loadable({
    loader: () =>
        import('./pages/TermsPage' /* webpackChunkName: "termsPage" */),
    loading: () => null,
});

const PrivacyPage = Loadable({
    loader: () =>
        import('./pages/PrivacyPage' /* webpackChunkName: "privacyPage" */),
    loading: () => null,
});

const NewReviewPage = Loadable({
    loader: () =>
        import('./pages/NewReviewPage' /* webpackChunkName: "newReviewPage" */),
    loading: () => null,
});

const DentistProfilePage = Loadable({
    loader: () =>
        import('./pages/DentistProfilePage' /* webpackChunkName: "dentistProfilePage" */),
    loading: () => null,
});

const AppointmentConfirmationPage = Loadable({
    loader: () =>
        import('./pages/AppointmentConfirmationPage' /* webpackChunkName: "appointmentConfirmationPage" */),
    loading: () => null,
});

const DentistOnboarding = Loadable({
    loader: () =>
        import('./pages/Onboarding/Dentist/Verification' /* webpackChunkName: "dentistOnboarding" */),
    loading: () => null,
});

const KioskRegistrationPage = Loadable({
    loader: () =>
        import('./pages/KioskRegistrationPage' /* webpackChunkName: "kioskRegistrationPage" */),
    loading: () => null,
});

const KioskBookAnAppointmentPage = Loadable({
    loader: () =>
        import('./pages/KioskBookAnAppointmentPage' /* webpackChunkName: "kioskBookAnAppointmentPage" */),
    loading: () => null,
});

const KioskMedicalHistoryFormPage = Loadable({
    loader: () =>
        import('./pages/KioskMedicalHistoryFormPage' /* webpackChunkName: "kioskMedicalHistoryFormPage" */),
    loading: () => null,
});

const KioskInsurancePage = Loadable({
    loader: () =>
        import('./pages/KioskInsurancePage' /* webpackChunkName: "kioskInsurancePage" */),
    loading: () => null,
});

const getIdQueryClient = gql`
    {
        activeUser @client {
            id
        }
        visibleModal @client
    }
`;

const PrivateRoute = ({
    isUserLoggedIn,
    component: ComponentToBeRendered,
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            isUserLoggedIn ? (
                <ComponentToBeRendered {...props} />
            ) : (
                <Redirect
                    preserveQueryString
                    to={{
                        pathname: '/login',
                        search: `?redirectTo=${props.location.pathname}${
                            props.location.search
                        }`,
                        state: {
                            from: props.location,
                            message:
                                'You need to login first before you can view this page',
                        },
                    }}
                />
            )
        }
    />
);

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router history={history}>
                    <Layout>
                        {/* TODO: Refactor */}
                        {!history.location.pathname.includes('kiosk') && (
                            <Header />
                        )}
                        <Content>
                            <ErrorBoundary>
                                <Query query={getIdQueryClient}>
                                    {({ data }) => (
                                        <Switch>
                                            <Route
                                                path="/login"
                                                component={LoginPage}
                                            />
                                            <Route
                                                path="/register"
                                                component={registerPage}
                                            />
                                            <Route
                                                path="/forgot-password"
                                                component={forgotPasswordPage}
                                            />
                                            <PrivateRoute
                                                path="/host-onboarding/:step"
                                                component={HostOnboarding}
                                                isUserLoggedIn={data.activeUser}
                                            />
                                            <PrivateRoute
                                                path="/consent-and-payment"
                                                component={
                                                    ConsentAndPaymentPage
                                                }
                                                isUserLoggedIn={data.activeUser}
                                            />
                                            <PrivateRoute
                                                path="/procedure-payment"
                                                component={
                                                    ProcedurePaymentRequestPage
                                                }
                                                isUserLoggedIn={data.activeUser}
                                            />
                                            <PrivateRoute
                                                path="/profile"
                                                component={ProfilePage}
                                                isUserLoggedIn={data.activeUser}
                                            />
                                            <PrivateRoute
                                                path="/appointment-confirmation"
                                                component={
                                                    AppointmentConfirmationPage
                                                }
                                                isUserLoggedIn={data.activeUser}
                                            />
                                            <PrivateRoute
                                                path="/dentist-profile"
                                                component={DentistProfilePage}
                                                isUserLoggedIn={data.activeUser}
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
                                                path="/office/search"
                                                component={OfficeSearchPage}
                                            />
                                            <Route
                                                path="/office/:id"
                                                component={OfficeDetailsPage}
                                            />
                                            <Route
                                                path="/review/:id"
                                                component={NewReviewPage}
                                            />
                                            <Route
                                                path="/reset-password"
                                                component={ResetPassPage}
                                            />
                                            <Route
                                                path="/about"
                                                component={AboutPage}
                                            />

                                            <Route
                                                path="/error"
                                                component={GeneralErrorPage}
                                            />
                                            <Route
                                                path="/"
                                                exact
                                                component={HomePage}
                                            />
                                            <Route
                                                path="/countdown"
                                                exact
                                                component={CountdownPage}
                                            />
                                            <Route
                                                path="/terms"
                                                exact
                                                component={TermsPage}
                                            />
                                            <Route
                                                path="/privacy"
                                                exact
                                                component={PrivacyPage}
                                            />
                                            <PrivateRoute
                                                path="/dentist-onboarding/verification"
                                                component={DentistOnboarding}
                                                isUserLoggedIn={data.activeUser}
                                            />
                                            <Route
                                                path="/kiosk/registration"
                                                exact
                                                component={
                                                    KioskRegistrationPage
                                                }
                                            />
                                            <Route
                                                path="/kiosk/book-an-appointment"
                                                exact
                                                component={
                                                    KioskBookAnAppointmentPage
                                                }
                                            />
                                            <Route
                                                path="/kiosk/medical-history-form"
                                                exact
                                                component={
                                                    KioskMedicalHistoryFormPage
                                                }
                                            />
                                            <Route
                                                path="/kiosk/insurance"
                                                exact
                                                component={KioskInsurancePage}
                                            />
                                            <Route component={Error404Page} />
                                        </Switch>
                                    )}
                                </Query>
                            </ErrorBoundary>
                        </Content>
                        {/* TODO: Refactor */}
                        {!history.location.pathname.includes('kiosk') && (
                            <Footer />
                        )}
                    </Layout>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;
