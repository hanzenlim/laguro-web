import { isEmpty } from 'lodash';

export const dollarMinimum = value =>
    value && value >= 100 ? undefined : 'Minimum price is $1';

export const isNum = value =>
    value && /^[1-9][0-9]*$/.test(value) ? undefined : 'Must be a whole number';

export const lessFifty = value =>
    value && value <= 50 ? undefined : 'Must be less than 50';

export const greaterZero = value =>
    value && value > 0 ? undefined : 'Must be greater than zero';

export function reviewConditions(value, allValues, props) {
    if (value === undefined) {
        return 'Required';
    } else if (!props.reviewerId) {
        return 'Please log in before you can leave a review.';
    } else if (props.ownPage) {
        return 'You cannot leave a review on your own office or dentist profile.';
    } else if (!props.isUserVerified) {
        return 'You cannot review an office or dentist that you have not had a reservation or appointment with.';
    } else if (props.alreadyReviewed) {
        return 'You have already reviewed this office or dentist.';
    } else if (!(value && value !== '')) {
        return 'Required';
    } else {
        return undefined;
    }
}

export function required(value) {
    return value && !isEmpty(value) ? undefined : 'Required';
}

export function confirmPassword(confirmationPassword, allValues) {
    const { newPassword } = allValues;
    return newPassword === confirmationPassword
        ? undefined
        : 'Confirmation password does not match.';
}
