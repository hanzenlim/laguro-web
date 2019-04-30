import _isEmpty from 'lodash/isEmpty';

// bio is ' '(a single space) when set by hostc creation in the backend
// used to distinguish between dentists created on web and on backend. isBioUpdated will return true for bios updated on frontEnd. bio is a required field in dentist profile form (must not be empty and must not be a ' '(a single space)
export const isBioUpdated = bio => !_isEmpty(bio) && bio !== ' ';

export const PROCEDURE_LIST = [
    'All procedures',
    'Fillings',
    'Crowns/Bridges/Venners',
    'Root Canals',
    'Gum Surgery/Grafting',
    'Deep Cleaning',
    'Whitening/Cosmetic',
    'Implant placement',
    'Implant crown',
    'Extractions/Surgery',
    'Dentures ',
    'Braces',
];

export const LANGUAGE_LIST = [
    'English',
    'Spanish',
    'Chinese',
    'Tagalog',
    'Vietnamese',
    'Korean',
    'Armenian',
    'Japanese',
    'German',
    'Persian',
    'Portuguese',
];

export const DAY_AVAILABILITY_LIST = ['Weekdays', 'Weekends'];

export const TIME_AVAILABILITY_LIST = [
    'During business hours',
    'Before/After business hours',
];

export const INSURANCE_LIST = [
    'MetLife',
    'Cigna',
    'Delta Dental of California',
];
