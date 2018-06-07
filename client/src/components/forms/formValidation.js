export const dollarMinimum = value =>
    value && value >= 1 ? undefined : 'Minimum hourly chair price is $1';

export const isNum = value =>
    value && !isNaN(value) ? undefined : 'Must be a number';

export const required = value =>
    value && value !== '' ? undefined : 'Required';
