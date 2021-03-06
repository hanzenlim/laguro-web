import _isEmpty from 'lodash/isEmpty';

// used in dashboard pages
const SELETED_TAB_SEARCH_PARAM_VALUE = 'selectedTab';

// pages for all users
export const ONBOARDING_TERMS_PAGE_URL = '/onboarding/terms/';
export const LOGIN_PAGE_URL = '/login';
export const RESET_PASSWORD_PAGE_URL = '/reset-password';
export const ABOUT_PAGE_URL = '/about';
export const GENERAL_ERROR_PAGE_URL = '/error';
export const COUNTDOWN_PAGE_URL = '/countdown';
export const SIGNUP_PROMO_PAGE_URL = '/promo100';
export const TERMS_PAGE_URL = '/terms';
export const LAGURO_CREDITS_TERMS_PAGE_URL = '/laguro-credits-terms';
export const PRIVACY_PAGE_URL = '/privacy';
export const KIOSK_URL = '/kiosk';
export const KIOSK_REG_PAGE_URL = '/kiosk/registration';
export const NEW_REVIEW_PAGE_URL_PREFIX = '/review';
export const KIOSK_OFFICE_SETUP_PAGE_URL = '/kiosk/office-setup';

export const URLS_FOR_ALL_USER_PAGES = [
    ONBOARDING_TERMS_PAGE_URL,
    LOGIN_PAGE_URL,
    RESET_PASSWORD_PAGE_URL,
    ABOUT_PAGE_URL,
    GENERAL_ERROR_PAGE_URL,
    COUNTDOWN_PAGE_URL,
    TERMS_PAGE_URL,
    PRIVACY_PAGE_URL,
    NEW_REVIEW_PAGE_URL_PREFIX,
];

// pages for patients
export const PATIENT_ONBOARDING_MEDICAL_HISTORY_FORM =
    '/kiosk/medical-history-form/';
export const PATIENT_ONBOARDING_INSURANCE_FORM = '/kiosk/insurance';
export const PROCEDURE_PAYMENT_REQUEST_PAGE_URL = '/procedure-payment';
export const APPOINTMENT_CONFIRMATION_PAGE_URL = '/appointment-confirmation';
export const DENTIST_SEARCH_PAGE_URL = '/dentist/search';
export const KIOSK_MEDICAL_HISTORY_FORM_CONFIRMATION_PAGE_URL =
    '/kiosk/medical-history-form-confirmation';
export const DENTIST_DETAILS_PAGE_URL_PREFIX = '/dentist';
export const PATIENT_DASHBOARD_PAGE_URL = '/dashboard/patient';
export const DENTIST_DASHBOARD_PAGE_URL = '/dashboard/dentist';
export const HOST_DASHBOARD_PAGE_URL = '/dashboard/host';

export const PATIENT_WEB_ONBOARDING_PAGE_URL = '/patient-onboarding';

export const PATIENT_DASHBOARD_PAGE_URL_BASE = `${PATIENT_DASHBOARD_PAGE_URL}?${SELETED_TAB_SEARCH_PARAM_VALUE}=`;
export const DENTIST_DASHBOARD_PAGE_URL_BASE = `${DENTIST_DASHBOARD_PAGE_URL}?${SELETED_TAB_SEARCH_PARAM_VALUE}=`;
export const HOST_DASHBOARD_PAGE_URL_BASE = `${HOST_DASHBOARD_PAGE_URL}?${SELETED_TAB_SEARCH_PARAM_VALUE}=`;

export const OFFICE_PAGES_URL_PREFIX = '/office';
export const OFFICE_SEARCH_PAGE_URL = '/office/search';

// used to make header background white
export const URLS_FOR_PATIENT_PAGES = [
    PATIENT_ONBOARDING_MEDICAL_HISTORY_FORM,
    PATIENT_ONBOARDING_INSURANCE_FORM,
    PROCEDURE_PAYMENT_REQUEST_PAGE_URL,
    APPOINTMENT_CONFIRMATION_PAGE_URL,
    DENTIST_SEARCH_PAGE_URL,
    KIOSK_MEDICAL_HISTORY_FORM_CONFIRMATION_PAGE_URL,
    DENTIST_DETAILS_PAGE_URL_PREFIX,
    PATIENT_DASHBOARD_PAGE_URL,
    KIOSK_URL,
    KIOSK_REG_PAGE_URL,
    OFFICE_SEARCH_PAGE_URL,
    OFFICE_PAGES_URL_PREFIX,
];

// pages for hosts and dentists
export const DENTIST_ONBOARDING_PROFILE_URL = '/onboarding/dentist/profile/';
export const DENTIST_ONBOARDING_VERIFICATION_URL =
    '/onboarding/dentist/verification/';
export const DENTIST_PROFILE_PAGE_URL = '/dentist-profile';
export const HOST_ONBOARDING_PAGE_URL_PREFIX = '/host-onboarding';

// used to make header background blue
export const URLS_FOR_HOST_AND_DENTIST_PAGES = [
    DENTIST_ONBOARDING_PROFILE_URL,
    DENTIST_ONBOARDING_VERIFICATION_URL,
    DENTIST_PROFILE_PAGE_URL,
    HOST_ONBOARDING_PAGE_URL_PREFIX,
    HOST_DASHBOARD_PAGE_URL,
    DENTIST_DASHBOARD_PAGE_URL,
];

export const HOME_PAGE_TYPE = 'homepage';
export const ALL_USER_PAGE_TYPE = 'all_users';
export const PATIENT_PAGE_TYPE = 'patient';
export const DENTIST_AND_HOST_PAGE_TYPE = 'dentist_and_host';

const checkPathnameList = (pathname, urls) => {
    const pathnameWithNoParams =
        pathname.indexOf('?') < 0
            ? pathname
            : pathname.slice(0, pathname.indexOf('?'));

    return urls.includes(pathnameWithNoParams);
};

export const getPageType = pathname => {
    const conditions = {
        homepage:
            _isEmpty(pathname) ||
            pathname === '/' ||
            pathname.startsWith('/?') ||
            pathname.startsWith('/#'),
        patientPages:
            checkPathnameList(pathname, URLS_FOR_PATIENT_PAGES) ||
            pathname.startsWith(`${DENTIST_DETAILS_PAGE_URL_PREFIX}/`) ||
            pathname.startsWith(OFFICE_PAGES_URL_PREFIX),
        dentistHostPages:
            checkPathnameList(pathname, URLS_FOR_HOST_AND_DENTIST_PAGES) ||
            pathname.startsWith(`${HOST_ONBOARDING_PAGE_URL_PREFIX}/`),
    };

    if (conditions.homepage) {
        return HOME_PAGE_TYPE;
    } else if (conditions.patientPages) {
        return PATIENT_PAGE_TYPE;
    } else if (conditions.dentistHostPages) {
        return DENTIST_AND_HOST_PAGE_TYPE;
    }
    return ALL_USER_PAGE_TYPE;
};

export const getLTMBaseUrl = () => {
    if (process.env.REACT_APP_ENV === 'development') {
        return 'http://localhost:3020';
    }

    if (process.env.REACT_APP_ENV === 'stage') {
        return 'https://ltm.laguro-stage.com';
    }

    if (process.env.REACT_APP_ENV === 'production') {
        return 'https://ltm.laguro.com';
    }

    return 'https://ltm.laguro.com';
};
