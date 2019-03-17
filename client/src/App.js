import React, { Component } from 'react';
import cookies from 'browser-cookies';
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
import {
    DENTIST_ONBOARDING_PROFILE_URL,
    DENTIST_ONBOARDING_VERIFICATION_URL,
    ONBOARDING_NAME_AND_PERSONA_PAGE,
    PATIENT_ONBOARDING_MEDICAL_HISTORY_FORM,
    PATIENT_ONBOARDING_INSURANCE_FORM,
    LOGIN_PAGE_URL,
    HOST_ONBOARDING_PAGE_URL_PREFIX,
    PROCEDURE_PAYMENT_REQUEST_PAGE_URL,
    APPOINTMENT_CONFIRMATION_PAGE_URL,
    DENTIST_PROFILE_PAGE_URL,
    DENTIST_DETAILS_PAGE_URL_PREFIX,
    OFFICE_DETAILS_PAGE_URL_PREFIX,
    RESET_PASSWORD_PAGE_URL,
    ABOUT_PAGE_URL,
    GENERAL_ERROR_PAGE_URL,
    COUNTDOWN_PAGE_URL,
    TERMS_PAGE_URL,
    PRIVACY_PAGE_URL,
    KIOSK_REGISTRATION_PAGE_URL,
    KIOSK_BOOK_APPT_URL,
    KIOSK_REASON_OF_VISIT_PAGE_URL,
    KIOSK_SELECT_PROCEDURE_PAGE_URL,
    KIOSK_BOOKING_CONFIRMATION_URL_PREFIX,
    KIOSK_MEDICAL_HISTORY_FORM_CONFIRMATION_PAGE_URL,
    KIOSK_CHECKIN_PAGE_URL_PREFIX,
    OFFICE_SEARCH_PAGE_URL,
    NEW_REVIEW_PAGE_URL_PREFIX,
    KIOSK_CONFIRMATION_PAGE_URL,
    DENTIST_SEARCH_PAGE_URL,
    PATIENT_DASHBOARD_PAGE_URL,
    DENTIST_DASHBOARD_PAGE_URL,
    HOST_DASHBOARD_PAGE_URL,
} from './util/urls';

const Header = Loadable({
    loader: () =>
        import('./pages/common/Header' /* webpackChunkName: "header" */),
    loading: () => null,
});

const HomePage = Loadable({
    loader: () => import('./pages/HomePage' /* webpackChunkName: "homePage" */),
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

const KioskRegistrationPage = Loadable({
    loader: () =>
        import('./pages/KioskRegistrationPage' /* webpackChunkName: "kioskRegistrationPage" */),
    loading: () => null,
});

const KioskBookAnAppointmentPage = Loadable({
    loader: () =>
        import('./pages/KioskBookAnAppointmentPage/BookAppointment' /* webpackChunkName: "kioskBookAnAppointmentPage" */),
    loading: () => null,
});

const KioskReasonOfVisitPage = Loadable({
    loader: () =>
        import('./pages/KioskBookAnAppointmentPage/ReasonOfVisit' /* webpackChunkName: "kioskBookAnAppointmentPage" */),
    loading: () => null,
});

const KioskSelectProcedurePage = Loadable({
    loader: () =>
        import('./pages/KioskBookAnAppointmentPage/SelectProcedure' /* webpackChunkName: "kioskBookAnAppointmentPage" */),
    loading: () => null,
});

const KioskBookingConfirmationPage = Loadable({
    loader: () =>
        import('./pages/KioskBookingConfirmationPage' /* webpackChunkName: "kioskBookingConfirmationPage" */),
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

const KioskConfirmationPage = Loadable({
    loader: () =>
        import('./pages/KioskConfirmationPage' /* webpackChunkName: "kioskConfirmationPage" */),
    loading: () => null,
});

const KioskCheckInPage = Loadable({
    loader: () =>
        import('./pages/KioskCheckInPage' /* webpackChunkName: "kioskCheckInPage" */),
    loading: () => null,
});

const KioskDentistProfilePage = Loadable({
    loader: () =>
        import('./pages/KioskDentistProfilePage' /* webpackChunkName: "kioskDentistProfilePage" */),
    loading: () => null,
});

const KioskMedicalHistoryFormConfirmationPage = Loadable({
    loader: () =>
        import('./pages/KioskMedicalHistoryFormPage/Confirmation' /* webpackChunkName: "kioskMedicalHistoryFormConfirmationPage" */),
    loading: () => null,
});

const NameAndPersonaPage = Loadable({
    loader: () =>
        import('./pages/Onboarding/NameAndPersona' /* webpackChunkName: "NameAndPersona" */),
    loading: () => null,
});

const DentistOnboardingVerification = Loadable({
    loader: () =>
        import('./pages/Onboarding/Dentist/Verification' /* webpackChunkName: "dentistOnboarding" */),
    loading: () => null,
});

const PatientDashboardPage = Loadable({
    loader: () =>
        import('./pages/PatientDashboardPage' /* webpackChunkName: "PatientDashboardPage" */),
    loading: () => null,
});

const DentistDashboardPage = Loadable({
    loader: () =>
        import('./pages/DentistDashboardPage' /* webpackChunkName: "DentistDashboardPage" */),
    loading: () => null,
});

const HostDashboardPage = Loadable({
    loader: () =>
        import('./pages/HostDashboardPage' /* webpackChunkName: "DentistDashboardPage" */),
    loading: () => null,
});

const PrivateRoute = ({ component: ComponentToBeRendered, ...rest }) => {
    let user = cookies.get('user');
    let isUserLoggedIn = false;
    if (user) {
        user = JSON.parse(user);
        if (user && user.id) {
            isUserLoggedIn = true;
        }
    }

    return (
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
};

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
                                <Switch>
                                    <Route
                                        path={LOGIN_PAGE_URL}
                                        component={LoginPage}
                                    />
                                    <PrivateRoute
                                        path={`${HOST_ONBOARDING_PAGE_URL_PREFIX}/:step`}
                                        component={HostOnboarding}
                                    />
                                    <PrivateRoute
                                        path={
                                            PROCEDURE_PAYMENT_REQUEST_PAGE_URL
                                        }
                                        component={ProcedurePaymentRequestPage}
                                    />
                                    <PrivateRoute
                                        path={PATIENT_DASHBOARD_PAGE_URL}
                                        component={PatientDashboardPage}
                                    />
                                    <PrivateRoute
                                        path={DENTIST_DASHBOARD_PAGE_URL}
                                        component={DentistDashboardPage}
                                    />
                                    <PrivateRoute
                                        path={HOST_DASHBOARD_PAGE_URL}
                                        component={HostDashboardPage}
                                    />
                                    <PrivateRoute
                                        path={APPOINTMENT_CONFIRMATION_PAGE_URL}
                                        component={AppointmentConfirmationPage}
                                    />
                                    <PrivateRoute
                                        path={DENTIST_PROFILE_PAGE_URL}
                                        component={DentistProfilePage}
                                    />
                                    <Route
                                        path={DENTIST_SEARCH_PAGE_URL}
                                        component={DentistSearchPage}
                                    />
                                    <Route
                                        path={`${DENTIST_DETAILS_PAGE_URL_PREFIX}/:id`}
                                        component={DentistDetailsPage}
                                    />
                                    <Route
                                        path={OFFICE_SEARCH_PAGE_URL}
                                        component={OfficeSearchPage}
                                    />
                                    <Route
                                        path={`${OFFICE_DETAILS_PAGE_URL_PREFIX}/:id`}
                                        component={OfficeDetailsPage}
                                    />
                                    <PrivateRoute
                                        path={`${NEW_REVIEW_PAGE_URL_PREFIX}/:id`}
                                        component={NewReviewPage}
                                    />
                                    <Route
                                        path={RESET_PASSWORD_PAGE_URL}
                                        component={ResetPassPage}
                                    />
                                    <Route
                                        path={ABOUT_PAGE_URL}
                                        component={AboutPage}
                                    />

                                    <Route
                                        path={GENERAL_ERROR_PAGE_URL}
                                        component={GeneralErrorPage}
                                    />
                                    <Route
                                        path="/"
                                        exact
                                        component={HomePage}
                                    />
                                    <Route
                                        path={COUNTDOWN_PAGE_URL}
                                        exact
                                        component={CountdownPage}
                                    />
                                    <Route
                                        path={TERMS_PAGE_URL}
                                        exact
                                        component={TermsPage}
                                    />
                                    <Route
                                        path={PRIVACY_PAGE_URL}
                                        exact
                                        component={PrivacyPage}
                                    />
                                    <PrivateRoute
                                        path={
                                            DENTIST_ONBOARDING_VERIFICATION_URL
                                        }
                                        component={
                                            DentistOnboardingVerification
                                        }
                                    />
                                    <PrivateRoute
                                        path={ONBOARDING_NAME_AND_PERSONA_PAGE}
                                        component={NameAndPersonaPage}
                                    />
                                    <Route
                                        path={KIOSK_REGISTRATION_PAGE_URL}
                                        exact
                                        component={KioskRegistrationPage}
                                    />
                                    <Route
                                        path={KIOSK_BOOK_APPT_URL}
                                        exact
                                        component={KioskBookAnAppointmentPage}
                                    />
                                    <Route
                                        path={KIOSK_REASON_OF_VISIT_PAGE_URL}
                                        exact
                                        component={KioskReasonOfVisitPage}
                                    />
                                    <Route
                                        path={KIOSK_SELECT_PROCEDURE_PAGE_URL}
                                        exact
                                        component={KioskSelectProcedurePage}
                                    />
                                    <Route
                                        path={
                                            KIOSK_BOOKING_CONFIRMATION_URL_PREFIX
                                        }
                                        exact
                                        component={KioskBookingConfirmationPage}
                                    />
                                    <Route
                                        path={
                                            PATIENT_ONBOARDING_MEDICAL_HISTORY_FORM
                                        }
                                        exact
                                        component={KioskMedicalHistoryFormPage}
                                    />
                                    <Route
                                        path={
                                            KIOSK_MEDICAL_HISTORY_FORM_CONFIRMATION_PAGE_URL
                                        }
                                        exact
                                        component={
                                            KioskMedicalHistoryFormConfirmationPage
                                        }
                                    />
                                    <Route
                                        path={PATIENT_ONBOARDING_INSURANCE_FORM}
                                        exact
                                        component={KioskInsurancePage}
                                    />
                                    <Route
                                        path={KIOSK_CHECKIN_PAGE_URL_PREFIX}
                                        exact
                                        component={KioskCheckInPage}
                                    />

                                    <Route
                                        path={KIOSK_CONFIRMATION_PAGE_URL}
                                        exact
                                        component={KioskConfirmationPage}
                                    />
                                    <PrivateRoute
                                        path={DENTIST_ONBOARDING_PROFILE_URL}
                                        component={KioskDentistProfilePage}
                                    />
                                    <Route component={Error404Page} />
                                </Switch>
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
