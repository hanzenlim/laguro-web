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

export const fetchActiveDentists = filters => async dispatch => {
    dispatch(requestDentists());
    const dentistsWithReservations = await Dentist.getActive();
    const dentists = dentistsWithReservations.map(obj => obj.dentist);
    if (!filters || (filters && !filters.location)) {
        dispatch({
            type: FETCH_DENTISTS,
            payload: dentists
        });
    } else {
        // Get distances for each location that each dentist has reserved at
        let distanceQueries = [];
        //for each dentist...
        for (let i = 0; i < dentistsWithReservations.length; i++) {
            // get reservations for this dentist
            const reservations = dentistsWithReservations[i].reservations;
            // extract locations from reservations
            const locations = reservations.map(res => res.location);
            // remove duplicate locations
            const filteredLocations = [...new Set(locations)];

            // create array of new dentist objects with each of their unique locations
            let dentistUniqueLocations = [];
            for (let j = 0; j < filteredLocations.length; j++) {
                dentistUniqueLocations.push({
                    ...dentists[i],
                    location: filteredLocations[j]
                });
            }

            // use google api to calculate distance from search query and append distance onto dentist object
            distanceQueries.push(getDistances(dentistUniqueLocations, filters));
        }
        let dentistsWithDistances = await Promise.all(distanceQueries);

        let mergedDentists = dentistsWithDistances[0];
        if (dentistsWithDistances.length > 1) {
            for (let i = 1; i < dentistsWithDistances.length; i++) {
                mergedDentists = mergedDentists.concat(
                    dentistsWithDistances[i]
                );
            }
        }

        dispatch({
            type: FETCH_DENTISTS,
            payload: mergedDentists
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
