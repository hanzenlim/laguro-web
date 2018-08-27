import { ADD_PAYMENT_OPTION, REMOVE_PAYMENT_OPTION } from './types';
import PaymentOption from '../models/paymentOption';

export const addPaymentOption = (userId, paymentToken) => async dispatch => {
    const response = await PaymentOption.create(userId, paymentToken);
    dispatch({
        type: ADD_PAYMENT_OPTION,
        payload: response,
    });
};

export const removePaymentOption = (userId, paymentToken) => async dispatch => {
    const response = await PaymentOption.delete(userId, paymentToken);
    dispatch({
        type: REMOVE_PAYMENT_OPTION,
        payload: response,
    });
};
