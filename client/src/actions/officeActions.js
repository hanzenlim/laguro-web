import history from '../history';
import Office from '../models/office';
import {
    REQUEST_OFFICES,
    FETCH_OFFICES,
    GET_SELECTED_OFFICES,
    CREATE_OFFICE
} from './types';
import { getDistances } from '../util/distances';
import { dispatchChildren } from '../util/dispatchUtil';

function requestOffices() {
    return {
        type: REQUEST_OFFICES
    };
}

export const fetchOffices = (filters, ...options) => async dispatch => {
    dispatch(requestOffices());
    const offices = await Office.scan(options);
    if (!filters || (filters && !filters.location)) {
        dispatch({
            type: FETCH_OFFICES,
            payload: offices
        });
    } else {
        const filteredOffices = await getDistances(offices, filters);
        dispatch({
            type: FETCH_OFFICES,
            payload: filteredOffices
        });
    }
};

export const queryOffices = (key, value) => async dispatch => {
    const offices = await Office.query(key, value);
    dispatch({
        type: FETCH_OFFICES,
        payload: offices
    });
};

export const getOffice = (id, ...options) => async dispatch => {
    dispatch(requestOffices());
    const office = await Office.get(id, options);
    dispatch({
        type: GET_SELECTED_OFFICES,
        payload: office
    });
    dispatchChildren(office, options, dispatch);
};

export function editOffice(values) {
    return async dispatch => {
        dispatch(requestOffices());
        const office = await Office.update(values);
        dispatch({
            type: GET_SELECTED_OFFICES,
            payload: office
        });
        history.push('/profile');
    };
}

export const deleteOffice = officeId => async () => {
    await Office.delete(officeId);
};

export function createOffice(values) {
    return async dispatch => {
        const office = await Office.create(values);
        dispatch({
            type: CREATE_OFFICE,
            payload: [office]
        });
    };
}
