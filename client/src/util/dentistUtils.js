import { lighten, darken } from 'polished';
import _isEmpty from 'lodash/isEmpty';
import theme from '../components/theme';

// bio is ' '(a single space) when set by hostc creation in the backend
// used to distinguish between dentists created on web and on backend. isBioUpdated will return true for bios updated on frontEnd. bio is a required field in dentist profile form (must not be empty and must not be a ' '(a single space)
export const isBioUpdated = bio => !_isEmpty(bio) && bio !== ' ';

export const PROCEDURE_LIST = [
    'All procedures',
    'Exams',
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
    'Any languages',
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
    'Russian',
];

export const DAY_AVAILABILITY_LIST = [
    'All days',
    'Monday',
    'Tueday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export const TIME_AVAILABILITY_LIST = [
    'Any time',
    'Early morning',
    'Morning',
    'Lunch',
    'Early afternoon',
    'Afternoon',
    'Evening',
];

export const INSURANCE_LIST = [
    'All insurances',
    'MetLife',
    'Cigna',
    'Delta Dental of California',
];

export const getProcedureColor = procedureName => {
    switch (procedureName) {
        case 'Exams':
            return theme.colors.background.blue;
        case 'Fillings':
            return lighten(0.1, theme.colors.background.blue);
        case 'Crowns, Bridges, Veneers':
            return darken(0.1, theme.colors.background.blue);
        case 'Root Canals':
            return theme.colors.background.yellow;
        case 'Gum Surgery / Grafting':
            return theme.colors.background.orange;
        case 'Extractions / Surgery':
            return darken(0.1, theme.colors.background.yellow);
        case 'Deep Cleaning':
            return '#6bd2b0';
        case 'Whitening / Cosmetic':
            return lighten(0.1, '#6bd2b0');
        case 'Dentures':
            return darken(0.1, '#6bd2b0');
        case 'Implant placement':
            return '#f97171';
        case 'Braces':
            return lighten(0.1, '#f97171');
        case 'Implant crown':
            return darken(0.1, '#f97171');
        default:
            return theme.colors.background.blue;
    }
};
