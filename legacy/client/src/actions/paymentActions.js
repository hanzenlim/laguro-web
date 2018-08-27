import makeApiCall from '../util/clientDataLoader';
import {
    FETCH_PAYEE_PAYMENTS,
    FETCH_PAYER_PAYMENTS,
    REQUEST_PAYMENT_HISTORY
} from './types';
import { PAYEE_ID } from '../util/strings'

const requestPaymentHistory = () => {
    return {
        type: REQUEST_PAYMENT_HISTORY
    };
}

export const loadPaymentHistory = (query, partitionKey, partitionValue, options) => async dispatch => {
    dispatch(requestPaymentHistory());
    const response = await makeApiCall(query, { input: {partitionKey, partitionValue, options} });
    const payments = response.data.queryPayments;
    if (partitionKey === PAYEE_ID) {
        dispatch({
            type: FETCH_PAYEE_PAYMENTS,
            payload: payments
        });
    } else {
        dispatch({
            type: FETCH_PAYER_PAYMENTS,
            payload: payments
        });
    }
    return payments;
};

export const dummyExport = '';
