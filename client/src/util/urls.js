import history from '../history';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';

// used in dashboard pages
const SELETED_TAB_SEARCH_PARAM_VALUE = 'selectedTab';

// pages for all users
export const ONBOARDING_NAME_AND_PERSONA_PAGE = '/onboarding/name-and-persona/';
export const LOGIN_PAGE_URL = '/login';
export const RESET_PASSWORD_PAGE_URL = '/reset-password';
export const ABOUT_PAGE_URL = '/about';
export const GENERAL_ERROR_PAGE_URL = '/error';
export const COUNTDOWN_PAGE_URL = '/countdown';
export const TERMS_PAGE_URL = '/terms';
export const PRIVACY_PAGE_URL = '/privacy';
export const KIOSK_REGISTRATION_PAGE_URL = '/kiosk/registration';
export const KIOSK_CONFIRMATION_PAGE_URL = '/kiosk/confirmation';

export const NEW_REVIEW_PAGE_URL_PREFIX = '/review';

export const URLS_FOR_ALL_USER_PAGES = [
    ONBOARDING_NAME_AND_PERSONA_PAGE,
    LOGIN_PAGE_URL,
    RESET_PASSWORD_PAGE_URL,
    ABOUT_PAGE_URL,
    GENERAL_ERROR_PAGE_URL,
    COUNTDOWN_PAGE_URL,
    TERMS_PAGE_URL,
    PRIVACY_PAGE_URL,
    KIOSK_REGISTRATION_PAGE_URL,
    KIOSK_CONFIRMATION_PAGE_URL,
    NEW_REVIEW_PAGE_URL_PREFIX,
];

// pages for patients
export const PATIENT_ONBOARDING_MEDICAL_HISTORY_FORM =
    '/kiosk/medical-history-form/';
export const PATIENT_ONBOARDING_INSURANCE_FORM = '/kiosk/insurance';
export const PROCEDURE_PAYMENT_REQUEST_PAGE_URL = '/procedure-payment';
export const APPOINTMENT_CONFIRMATION_PAGE_URL = '/appointment-confirmation';
export const DENTIST_SEARCH_PAGE_URL = '/dentist/search';
export const KIOSK_BOOK_APPT_URL = '/kiosk/book-appointment';
export const KIOSK_REASON_OF_VISIT_PAGE_URL = '/kiosk/reason-of-visit';
export const KIOSK_SELECT_PROCEDURE_PAGE_URL = '/kiosk/select-procedure';
export const KIOSK_MEDICAL_HISTORY_FORM_CONFIRMATION_PAGE_URL =
    '/kiosk/medical-history-form-confirmation';
export const DENTIST_DETAILS_PAGE_URL_PREFIX = '/dentist';
export const PATIENT_DASHBOARD_PAGE_URL = '/dashboard/patient';
export const DENTIST_DASHBOARD_PAGE_URL = '/dashboard/dentist';
export const HOST_DASHBOARD_PAGE_URL = '/dashboard/host';

export const KIOSK_BOOKING_CONFIRMATION_URL_PREFIX =
    '/kiosk/booking-confirmation';
export const KIOSK_CHECKIN_PAGE_URL_PREFIX = '/kiosk/check-in';

export const PATIENT_DASHBOARD_PAGE_URL_BASE = `${PATIENT_DASHBOARD_PAGE_URL}?${SELETED_TAB_SEARCH_PARAM_VALUE}=`;
export const DENTIST_DASHBOARD_PAGE_URL_BASE = `${DENTIST_DASHBOARD_PAGE_URL}?${SELETED_TAB_SEARCH_PARAM_VALUE}=`;
export const HOST_DASHBOARD_PAGE_URL_BASE = `${HOST_DASHBOARD_PAGE_URL}?${SELETED_TAB_SEARCH_PARAM_VALUE}=`;

// used to make header background white
export const URLS_FOR_PATIENT_PAGES = [
    PATIENT_ONBOARDING_MEDICAL_HISTORY_FORM,
    PATIENT_ONBOARDING_INSURANCE_FORM,
    PROCEDURE_PAYMENT_REQUEST_PAGE_URL,
    APPOINTMENT_CONFIRMATION_PAGE_URL,
    DENTIST_SEARCH_PAGE_URL,
    KIOSK_BOOK_APPT_URL,
    KIOSK_REASON_OF_VISIT_PAGE_URL,
    KIOSK_SELECT_PROCEDURE_PAGE_URL,
    KIOSK_BOOKING_CONFIRMATION_URL_PREFIX,
    KIOSK_MEDICAL_HISTORY_FORM_CONFIRMATION_PAGE_URL,
    DENTIST_DETAILS_PAGE_URL_PREFIX,
    KIOSK_BOOKING_CONFIRMATION_URL_PREFIX,
    KIOSK_CHECKIN_PAGE_URL_PREFIX,
    PATIENT_DASHBOARD_PAGE_URL,
];

// pages for hosts and dentists
export const DENTIST_ONBOARDING_PROFILE_URL = '/onboarding/dentist/profile/';
export const DENTIST_ONBOARDING_VERIFICATION_URL =
    '/onboarding/dentist/verification/';
export const DENTIST_PROFILE_PAGE_URL = '/dentist-profile';
export const OFFICE_SEARCH_PAGE_URL = '/office/search';

export const HOST_ONBOARDING_PAGE_URL_PREFIX = '/host-onboarding';
export const OFFICE_DETAILS_PAGE_URL_PREFIX = '/office';

// used to make header background blue
export const URLS_FOR_HOST_AND_DENTIST_PAGES = [
    DENTIST_ONBOARDING_PROFILE_URL,
    DENTIST_ONBOARDING_VERIFICATION_URL,
    DENTIST_PROFILE_PAGE_URL,
    OFFICE_SEARCH_PAGE_URL,
    HOST_ONBOARDING_PAGE_URL_PREFIX,
    OFFICE_DETAILS_PAGE_URL_PREFIX,
    HOST_DASHBOARD_PAGE_URL,
    DENTIST_DASHBOARD_PAGE_URL,
];

export const HOME_PAGE_TYPE = 'homepage';
export const ALL_USER_PAGE_TYPE = 'all_users';
export const PATIENT_PAGE_TYPE = 'patient';
export const DENTIST_AND_HOST_PAGE_TYPE = 'dentist_and_host';

const isAtGivenUrl = (pathname, url) => {
    // first boolean is for when pathname is identical to url, and the second is for when the pathname includes this.props.match.props like :step, or :id at the end of the pathname. e.g. /dentist/"dentist_id". we drop these match.props and compare if pathname and url are equal
    return (
        pathname === url ||
        _isEqual(pathname.split('/').slice(0, -1), url.split('/'))
    );
};
const isAtSomeGivenUrls = (pathname, urls) =>
    urls.map(url => isAtGivenUrl(pathname, url)).some(boolean => boolean);

export const getPageType = (pathname = history.location.pathname) => {
    // homepage
    if (_isEmpty(pathname) || pathname === '/') {
        return HOME_PAGE_TYPE;
    } else if (isAtSomeGivenUrls(pathname, URLS_FOR_ALL_USER_PAGES)) {
        return ALL_USER_PAGE_TYPE;
    } else if (isAtSomeGivenUrls(pathname, URLS_FOR_PATIENT_PAGES)) {
        return PATIENT_PAGE_TYPE;
    } else if (isAtSomeGivenUrls(pathname, URLS_FOR_HOST_AND_DENTIST_PAGES)) {
        return DENTIST_AND_HOST_PAGE_TYPE;
    }
};
