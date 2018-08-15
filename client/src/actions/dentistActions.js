import Dentist from '../models/dentist';
import { getDistances } from '../util/distances';
import { dispatchChildren } from '../util/dispatchUtil';
import {
    REQUEST_DENTISTS,
    FETCH_DENTISTS,
    GET_ONE_DENTIST,
    UPDATE_DENTIST_RESERVATIONS,
} from './types';
import makeApiCall from '../util/clientDataLoader';

function requestDentists() {
    return {
        type: REQUEST_DENTISTS,
    };
}

export const fetchActiveDentists = filters => async dispatch => {
    dispatch(requestDentists());
    const dentistsWithReservations = await Dentist.getActive();
    const dentists = dentistsWithReservations.map(obj => obj.dentist);
    // Get distances for each location that each dentist has reserved at
    const distanceQueries = [];
    const dentistEntries = [];
    // for each dentist...
    for (let i = 0; i < dentistsWithReservations.length; i++) {
        // get reservations for this dentist
        const reservations = dentistsWithReservations[i].reservations;
        const locationSchedule = {};
        for (let i = 0; i < reservations.length; i += 1) {
            const location = reservations[i].location;
            if (!locationSchedule[location]) {
                locationSchedule[location] = [];
            }
            locationSchedule[location].push({
                startTime: reservations[i].startTime,
                endTime: reservations[i].endTime,
            });
        }
        // remove duplicate locations
        const uniqueLocations = [...new Set(Object.keys(locationSchedule))];
        // create array of new dentist objects with each of their unique locations
        const dentistUniqueLocations = [];
        for (let j = 0; j < uniqueLocations.length; j++) {
            const dentistEntry = {
                ...dentists[i],
                location: uniqueLocations[j],
                schedule: locationSchedule[uniqueLocations[j]],
            };
            dentistEntries.push(dentistEntry);
            dentistUniqueLocations.push(dentistEntry);
        }

        // use google api to calculate distance from search query and append distance onto dentist object
        if (filters) {
            distanceQueries.push(getDistances(dentistUniqueLocations, filters));
        }
    }
    if (!filters || (filters && !filters.location)) {
        dispatch({
            type: FETCH_DENTISTS,
            payload: dentistEntries,
        });
    } else {
        const dentistsWithDistances = await Promise.all(distanceQueries);

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
            payload: mergedDentists,
        });
    }
};

export const loadDentistProfile = (query, dentistId) => async dispatch => {
    dispatch(requestDentists());
    const response = await makeApiCall(query, { id: dentistId });
    const dentist = response.data.getDentist;
    dispatch({
        type: GET_ONE_DENTIST,
        payload: dentist,
    });
    return dentist;
};

export const updateDentist = dentist => async dispatch => {
    dispatch({
        type: UPDATE_DENTIST_RESERVATIONS,
        payload: dentist,
    });
};

export const getDentist = (id, ...options) => async dispatch => {
    dispatch(requestDentists());
    const dentist = await Dentist.get(id, options);
    dispatch({
        type: GET_ONE_DENTIST,
        payload: dentist,
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
            payload: dentist,
        });
    };
}

export function editDentist(values) {
    return async dispatch => {
        const dentist = await Dentist.update(values);
        dispatch({
            type: GET_ONE_DENTIST,
            payload: dentist,
        });
    };
}
