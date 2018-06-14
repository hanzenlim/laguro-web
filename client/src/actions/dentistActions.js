import Dentist from '../models/dentist';
import { getDistances } from '../util/distances';
import { dispatchChildren } from '../util/dispatchUtil';
import {
    REQUEST_DENTISTS,
    FETCH_DENTISTS,
    GET_ONE_DENTIST,
    UPDATE_DENTIST_RESERVATIONS
} from './types';
import makeApiCall from '../util/clientDataLoader';
import history from '../history';

function requestDentists() {
    return {
        type: REQUEST_DENTISTS
    };
}

export const fetchDentists = filters => async dispatch => {
    dispatch(requestDentists());
    const dentists = await Dentist.getActive();
    if (!filters || (filters && !filters.location)) {
        dispatch({
            type: FETCH_DENTISTS,
            payload: dentists
        });
    } else {
        const filteredDentists = await getDistances(dentists, filters);
        dispatch({
            type: FETCH_DENTISTS,
            payload: filteredDentists
        });
    }
};

export const loadDentistProfile = (query, dentistId) => async dispatch => {
    dispatch(requestDentists());
    const response = await makeApiCall(query, { id: dentistId });
    const dentist = response.data.getDentist;
    dispatch({
        type: GET_ONE_DENTIST,
        payload: dentist
    });
    return dentist;
};

export const updateDentist = dentist => async dispatch => {
    dispatch({
        type: UPDATE_DENTIST_RESERVATIONS,
        payload: dentist
    });
};

export const getDentist = (id, ...options) => async dispatch => {
    dispatch(requestDentists());
    const dentist = await Dentist.get(id, options);
    dispatch({
        type: GET_ONE_DENTIST,
        payload: dentist
    });
    if (!dentist) {
        return;
    }
    dispatchChildren(dentist, options, dispatch);
    return dentist;
};

export function createDentist(values) {
    return async dispatch => {
        const dentist = await Dentist.create(values);
        dispatch({
            type: GET_ONE_DENTIST,
            payload: dentist
        });
    };
}

export function editDentist(values) {
    return async dispatch => {
        const dentist = await Dentist.update(values);
        dispatch({
            type: FETCH_DENTISTS,
            payload: dentist
        });
        history.push('/profile');
    };
}
