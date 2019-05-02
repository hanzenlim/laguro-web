import {
    LOG_OUT_MENU_TEXT,
    // profile menu
    ACCOUNT_SETTINGS_MENU_TEXT,
    APPOINTMENTS_MENU_TEXT,
    DENTAL_RECORDS_MENU_TEXT,
    MEDICAL_HISTORY_MENU_TEXT,
    INSURANCE_MENU_TEXT,
    PENDING_REQUESTS_MENU_TEXT,
    PAYMENT_METHODS_MENU_TEXT,
    // dentist menu
    LAGURO_TREATMENT_MODULE_MENU_TEXT,
    PROFILE_SETTINGS_MENU_TEXT,
    DENTIST_VERIFICATION_MENU_TEXT,
    CALENDAR_MENU_TEXT,
    CREATE_A_NEW_APPOINTMENT_MENU_TEXT,
    MY_PATIENTS_MENU_TEXT,
    SEARCH_FOR_CHAIRS_MENU_TEXT,
    VIEW_PROFILE_MENU_TEXT,
    AVAILABILITY_SETTINGS_MENU_TEXT,
    // host menu
    MY_OFFICES_MENU_TEXT,
    ADD_A_NEW_OFFICE_MENU_TEXT,
    BECOME_A_DENTIST_MENU_TEXT,
    BECOME_A_HOST_MENU_TEXT,
    LAGURO_WALLET_MENU_TEXT,
} from './strings';
import {
    PATIENT_DASHBOARD_PAGE_URL_BASE,
    DENTIST_DASHBOARD_PAGE_URL_BASE,
    DENTIST_PROFILE_PAGE_URL,
    HOST_DASHBOARD_PAGE_URL_BASE,
    HOST_ONBOARDING_PAGE_URL_PREFIX,
    DENTIST_ONBOARDING_PROFILE_URL,
    OFFICE_SEARCH_PAGE_URL,
    getLTMBaseUrl,
} from './urls';
import { getKeyFromText } from '../pages/Dashboard/utils';

const LTM_LINK_BASE_URL = getLTMBaseUrl();

const LTM_URL = `${LTM_LINK_BASE_URL}/go?to=/chart`;

// profile menu
// unclassified means there is no section header for given menu texts
const unclassfiedProfileMenuTexts = [ACCOUNT_SETTINGS_MENU_TEXT];

const patientMenuTexts = [
    APPOINTMENTS_MENU_TEXT,
    DENTAL_RECORDS_MENU_TEXT,
    MEDICAL_HISTORY_MENU_TEXT,
    INSURANCE_MENU_TEXT,
];

const paymentMenuTexts = [
    PENDING_REQUESTS_MENU_TEXT,
    PAYMENT_METHODS_MENU_TEXT,
    LAGURO_WALLET_MENU_TEXT,
];

export const profileMenuTexts = [
    ...unclassfiedProfileMenuTexts,
    ...patientMenuTexts,
    ...paymentMenuTexts,
    LOG_OUT_MENU_TEXT,
];

// Menus.js also includes Log out button at the end of menu
export const profileMenuSections = [
    { dividerText: '', menuTexts: unclassfiedProfileMenuTexts },
    { dividerText: 'PATIENT', menuTexts: patientMenuTexts },
    { dividerText: 'PAYMENT', menuTexts: paymentMenuTexts },
];

// an object whose key is menu text and value is url which it links to. e.g. { Account Settings: '/dashboard/patient?selectedTab=account_settings' }
export const profileMenuTextToLinkTo = {
    ...profileMenuTexts.reduce(
        (acc, menuText) => ({
            ...acc,
            ...{
                [menuText]: `${PATIENT_DASHBOARD_PAGE_URL_BASE}${getKeyFromText(
                    menuText
                )}`,
            },
        }),
        {}
    ),
    [DENTAL_RECORDS_MENU_TEXT]: LTM_URL,
    [LOG_OUT_MENU_TEXT]: '#',
    [BECOME_A_DENTIST_MENU_TEXT]: DENTIST_ONBOARDING_PROFILE_URL,
    [BECOME_A_HOST_MENU_TEXT]: `${HOST_ONBOARDING_PAGE_URL_PREFIX}/add-office`,
};

// dentist menu

// unclassified means there is no section header for given menu texts
const unclassfiedDentistMenuTexts = [LAGURO_TREATMENT_MODULE_MENU_TEXT];
const unclassfiedDentistMenuTexts2 = [
    PROFILE_SETTINGS_MENU_TEXT,
    AVAILABILITY_SETTINGS_MENU_TEXT,
    DENTIST_VERIFICATION_MENU_TEXT,
];

const apptsMenuTexts = [
    CALENDAR_MENU_TEXT,
    CREATE_A_NEW_APPOINTMENT_MENU_TEXT,
    MY_PATIENTS_MENU_TEXT,
];

const unclassfiedDentistMenuTexts3 = [
    SEARCH_FOR_CHAIRS_MENU_TEXT,
    VIEW_PROFILE_MENU_TEXT,
];

const dentistMenuTexts = [
    ...unclassfiedDentistMenuTexts,
    ...unclassfiedDentistMenuTexts2,
    ...apptsMenuTexts,
    ...unclassfiedDentistMenuTexts3,
];

export const dentistDashboardMenuTexts = [
    ...unclassfiedDentistMenuTexts2,
    ...apptsMenuTexts,
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

// an object whose key is menu text and value is url which it links to. e.g. { Account Settings: '/dashboard/patient?selectedTab=account_settings' }
export const dentistMenuTextToLinkTo = {
    ...dentistMenuTexts.reduce(
        (acc, menuText) => ({
            ...acc,
            ...{
                [menuText]: `${DENTIST_DASHBOARD_PAGE_URL_BASE}${getKeyFromText(
                    menuText
                )}`,
            },
        }),
        {}
    ),
    // add special urls here
    [CALENDAR_MENU_TEXT]: DENTIST_PROFILE_PAGE_URL,
    [LAGURO_TREATMENT_MODULE_MENU_TEXT]: getLTMBaseUrl(),
    [SEARCH_FOR_CHAIRS_MENU_TEXT]: OFFICE_SEARCH_PAGE_URL,
};

// host menu
// unclassified means there is no section header for given menu texts
const unclassfiedHostMenuTexts = [
    MY_OFFICES_MENU_TEXT,
];
const unclassfiedHostMenuTexts2 = [ADD_A_NEW_OFFICE_MENU_TEXT];

export const hostMenuSections = [
    { dividerText: '', menuTexts: unclassfiedHostMenuTexts },
    { dividerText: '', menuTexts: unclassfiedHostMenuTexts2, isLong: true },
];

export const hostDashboardMenuTexts = [
    ...unclassfiedHostMenuTexts,
    ...unclassfiedHostMenuTexts2,
];

// an object whose key is menu text and value is url which it links to. e.g. { Account Settings: '/dashboard/patient?selectedTab=account_settings' }
export const hostMenuTextToLinkTo = {
    ...hostDashboardMenuTexts.reduce(
        (acc, menuText) => ({
            ...acc,
            ...{
                [menuText]: `${HOST_DASHBOARD_PAGE_URL_BASE}${getKeyFromText(
                    menuText
                )}`,
            },
        }),
        {}
    ),
    // add special urls here
    [ADD_A_NEW_OFFICE_MENU_TEXT]: `${HOST_ONBOARDING_PAGE_URL_PREFIX}/add-office`,
};
