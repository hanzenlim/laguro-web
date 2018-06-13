import Dentist from '../models/dentist';
import { getDistances } from '../util/distances';
import { dispatchChildren } from '../util/dispatchUtil';
import { REQUEST_DENTISTS, FETCH_DENTISTS, GET_ONE_DENTIST } from './types';
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
