import { conformToMask } from 'react-text-mask';

// Removes spaces, parentheses and dashes
export const trimPhoneNumber = phoneNumber => {
    if (!phoneNumber) return '';

    return phoneNumber.replace(/[- )(]/g, '').trim();
};

export const PHONE_NUMBER_MASK = [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

export const COUNTRY_CODE = '+1';

export const VALID_PHONE_NUMBER_INPUT_LENGTH = 10;

export const isPhoneNumberInputValid = phoneNumber => {
    const trimmedPhoneNumber = trimPhoneNumber(phoneNumber);

    return (
        trimmedPhoneNumber &&
        trimmedPhoneNumber.length === VALID_PHONE_NUMBER_INPUT_LENGTH
    );
};

export const formatPhoneNumber = phoneNumber => {
    const trimmedPhoneNumber = trimPhoneNumber(phoneNumber);

    return trimmedPhoneNumber ? `${COUNTRY_CODE}${trimmedPhoneNumber}` : null;
};

export const maskPhoneNumber = phoneNumber => {
    if (!phoneNumber) return null;

    const phoneNumberWithoutCountryCode = phoneNumber.substr(2);
    const options = { guide: false };
    const { conformedValue } = conformToMask(
        phoneNumberWithoutCountryCode,
        PHONE_NUMBER_MASK,
        options
    );

    return conformedValue;
};
