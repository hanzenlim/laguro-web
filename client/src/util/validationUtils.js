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
