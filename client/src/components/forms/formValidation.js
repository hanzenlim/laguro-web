export const dollarMinimum = value =>
    value && value >= 1 ? undefined : 'Minimum hourly chair price is $1';

export const isNum = value =>
    value && /^[1-9][0-9]*$/.test(value) ? undefined : 'Must be a whole number';

export const lessFifty = value =>
    value && value <= 50 ? undefined : 'Must be less than 50';

export const greaterZero = value =>
    value && value > 0 ? undefined : 'Must be greater than zero';

export function requiredAndSignedIn(value, allValues, props) {
    if (!props.reviewerId) {
        return 'Please log in before you can leave a review.';
    } else if (props.own) {
        return 'You cannot leave a review on your own office or dentist profile.';
    } else if (props.wasReviewed) {
        return 'You have already reviewed this office or dentist.';
    } else if (!(value && value !== '')) {
        return 'Required';
    } else {
        return undefined;
    }
}

export function required(value) {
    return value && value !== '' ? undefined : 'Required';
}
