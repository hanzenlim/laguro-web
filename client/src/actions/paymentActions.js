import makeApiCall from '../util/clientDataLoader';
import {
    FETCH_PAYMENTS
} from './types';

export const loadPaymentHistory = (query, partitionKey, partitionValue, options) => async dispatch => {
    const response = await makeApiCall(query, { input: {partitionKey, partitionValue, options} });
    const payments = response.data.queryPayments;
    dispatch({
        type: FETCH_PAYMENTS,
        payload: payments
    });
    return payments;
};

export const dummyExport = '';
