import {
    ACCOUNT_SETTINGS_MENU_TEXT,
    APPOINTMENTS_MENU_TEXT,
    MEDICAL_HISTORY_MENU_TEXT,
    INSURANCE_MENU_TEXT,
    PENDING_REQUESTS_MENU_TEXT,
    RECEIPTS_MENU_TEXT,
    PAYMENT_METHODS_MENU_TEXT,
    BECOME_A_DENTIST_MENU_TEXT,
    BECOME_A_HOST_MENU_TEXT,
    LOG_OUT_MENU_TEXT,
    LAGURO_TREATMENT_MODULE_MENU_TEXT,
    PROFILE_SETTINGS_MENU_TEXT,
    DENTIST_VERIFICATION_MENU_TEXT,
    NEW_APPOINTMENT_MENU_TEXT,
    MY_PATIENTS_MENU_TEXT,
    BOOKINGS_MENU_TEXT,
    LAGURO_BALANCE_MENU_TEXT,
    SEARCH_FOR_CHAIRS_MENU_TEXT,
    VIEW_PROFILE_MENU_TEXT,
    MY_OFFICES_MENU_TEXT,
    ADD_A_NEW_OFFICE_MENU_TEXT,
} from '../../../util/strings';

export const HEADER_HEIGHT = 48;

export const menuTextToLinkTo = {
    [ACCOUNT_SETTINGS_MENU_TEXT]: '/',
    [APPOINTMENTS_MENU_TEXT]: '/',
    [MEDICAL_HISTORY_MENU_TEXT]: '/',
    [INSURANCE_MENU_TEXT]: '/',
    [PENDING_REQUESTS_MENU_TEXT]: '/',
    [RECEIPTS_MENU_TEXT]: '/',
    [PAYMENT_METHODS_MENU_TEXT]: '/',
    [BECOME_A_DENTIST_MENU_TEXT]: '/',
    [BECOME_A_HOST_MENU_TEXT]: '/',
    [LOG_OUT_MENU_TEXT]: '#',
    [LAGURO_TREATMENT_MODULE_MENU_TEXT]: '/',
    [PROFILE_SETTINGS_MENU_TEXT]: '/',
    [DENTIST_VERIFICATION_MENU_TEXT]: '/',
    [NEW_APPOINTMENT_MENU_TEXT]: '/',
    [MY_PATIENTS_MENU_TEXT]: '/',
    [BOOKINGS_MENU_TEXT]: '/',
    [LAGURO_BALANCE_MENU_TEXT]: '/',
    [SEARCH_FOR_CHAIRS_MENU_TEXT]: '/',
    [VIEW_PROFILE_MENU_TEXT]: '/',
    [MY_OFFICES_MENU_TEXT]: '/',
    [ADD_A_NEW_OFFICE_MENU_TEXT]: '/',
};

// profile menu
const unclassfiedProfileMenuTexts = [ACCOUNT_SETTINGS_MENU_TEXT];

const patientMenuTexts = [
    APPOINTMENTS_MENU_TEXT,
    MEDICAL_HISTORY_MENU_TEXT,
    INSURANCE_MENU_TEXT,
];

const paymentMenuTexts = [
    PENDING_REQUESTS_MENU_TEXT,
    RECEIPTS_MENU_TEXT,
    PAYMENT_METHODS_MENU_TEXT,
];

// Menus.js also includes Log out button at the end of menu
export const profileMenuSections = [
    { dividerText: '', menuTexts: unclassfiedProfileMenuTexts },
    { dividerText: 'PATIENT', menuTexts: patientMenuTexts },
    { dividerText: 'PAYMENT', menuTexts: paymentMenuTexts },
];

// dentist menu

// unclassified means there is no section header for given menu texts
const unclassfiedDentistMenuTexts = [LAGURO_TREATMENT_MODULE_MENU_TEXT];
const unclassfiedDentistMenuTexts2 = [
    PROFILE_SETTINGS_MENU_TEXT,
    DENTIST_VERIFICATION_MENU_TEXT,
];

const apptsMenuTexts = [
    NEW_APPOINTMENT_MENU_TEXT,
    MY_PATIENTS_MENU_TEXT,
    BOOKINGS_MENU_TEXT,
    LAGURO_BALANCE_MENU_TEXT,
];

const unclassfiedDentistMenuTexts3 = [
    SEARCH_FOR_CHAIRS_MENU_TEXT,
    VIEW_PROFILE_MENU_TEXT,
];

// divider will appear at the top of each menu section
export const dentistMenuSections = [
    { dividerText: '', menuTexts: unclassfiedDentistMenuTexts },
    {
        dividerText: '',
        menuTexts: unclassfiedDentistMenuTexts2,
        isLong: true,
    },
    { dividerText: 'Appointments', menuTexts: apptsMenuTexts },
    { dividerText: '', menuTexts: unclassfiedDentistMenuTexts3 },
];

// host menu
const unclassfiedHostMenuTexts = [
    MY_OFFICES_MENU_TEXT,
    LAGURO_BALANCE_MENU_TEXT,
];
const unclassfiedHostMenuTexts2 = [ADD_A_NEW_OFFICE_MENU_TEXT];

export const hostMenuSections = [
    { dividerText: '', menuTexts: unclassfiedHostMenuTexts },
    { dividerText: '', menuTexts: unclassfiedHostMenuTexts2, isLong: true },
];
