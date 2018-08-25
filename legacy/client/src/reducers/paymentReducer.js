import {
    FETCH_PAYEE_PAYMENTS,
    FETCH_PAYER_PAYMENTS,
    REQUEST_PAYMENT_HISTORY
} from '../actions/types';

export default function(
    state = {
        isFetchingPayeePayments: false,
        isFetchingPayerPayments: false,
        invalid: false,
        payeePayments: [],
        payerPayments: []
    },
    action
) {
    switch (action.type) {
    case REQUEST_PAYMENT_HISTORY:
        return Object.assign({}, state, {
            ...state,
            isFetchingPayeePayments: true,
            isFetchingPayerPayments: true,
            invalid: false
        });
    case FETCH_PAYEE_PAYMENTS:
        return Object.assign({}, state, {
            ...state,
            isFetchingPayeePayments: false,
            payeePayments: action.payload
        });
    case FETCH_PAYER_PAYMENTS:
        return Object.assign({}, state, {
            ...state,
            isFetchingPayerPayments: false,
            payerPayments: action.payload
        });
    default:
        return state;
    }
}
