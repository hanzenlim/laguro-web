import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { conformToMask } from 'react-text-mask';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

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

export const serializePhoneNumber = phoneNumber => {
    if (!phoneNumber) {
        return phoneNumber;
    }

    const parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(
        phoneNumber,
        'US'
    );
    const standardizedPhoneNumber = phoneNumberUtil.format(
        parsedPhoneNumber,
        PhoneNumberFormat.E164
    );

    return standardizedPhoneNumber;
};

// a bit hacky but will avoid modifying the form
export const deserializedPhoneNumber = serializedPhoneNumber => {
    if (
        serializePhoneNumber(serializedPhoneNumber) !== serializedPhoneNumber ||
        !serializedPhoneNumber
    ) {
        return serializedPhoneNumber;
    }
    const areaCode = serializedPhoneNumber.substring(2, 5);
    const nextThree = serializedPhoneNumber.substring(5, 8);
    const lastFour = serializedPhoneNumber.substring(8, 12);

    return `(${areaCode}) ${nextThree}-${lastFour}`;
};
