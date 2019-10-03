import validator from 'validator';

export const validatePhoneOrEmail = phoneOrEmail => {
    if (!phoneOrEmail) return false;

    const isEmail = validator.isEmail(phoneOrEmail);
    const isNumeric = validator.isNumeric(phoneOrEmail);
    const hasCorrectDigitCount = phoneOrEmail.length === 10;

    if (!isEmail) {
        if (!isNumeric) {
            return false;
        }

        if (!hasCorrectDigitCount) {
            return false;
        }
    }

    return true;
};

export const validatePhone = phone => {
    if (!phone) return false;

    const isNumeric = validator.isNumeric(phone);
    const hasCorrectDigitCount = phone.length === 10;

    if (!isNumeric) {
        return false;
    }

    if (!hasCorrectDigitCount) {
        return false;
    }

    return true;
};
