export const dollarMinimum = value =>
    value && value >= 1 ? undefined : 'Minimum hourly chair price is $1';

export const isNum = value =>
    value && !isNaN(value) ? undefined : 'Must be a number';

export function requiredAndSignedIn(value, allValues, props) {
    if (!props.reviewerId) {
        return 'Please log in before you can leave a review.';
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
