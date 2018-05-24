import {
    DENTIST,
    DENTISTS,
    OFFICE,
    OFFICES,
    LISTING,
    LISTINGS,
    RESERVATIONS,
    REVIEWS
} from './strings';
import {
    GET_ONE_DENTIST,
    GET_SELECTED_OFFICES,
    FETCH_OFFICES,
    GET_SELECTED_LISTINGS,
    FETCH_LISTINGS,
    GET_SELECTED_RESERVATIONS,
    FETCH_REVIEWS
} from '../actions/types';

// eslint-disable-next-line
export const dispatchChildren = (entity, options, dispatch) => {
    if (options.includes(DENTIST)) {
        dispatch({
            type: GET_ONE_DENTIST,
            payload: entity.dentist
        });
    }

    if (options.includes(DENTISTS)) {
        dispatch({
            type: GET_ONE_DENTIST,
            payload: entity.dentists
        });
    }

    if (options.includes(OFFICE)) {
        dispatch({
            type: GET_SELECTED_OFFICES,
            payload: entity.office
        });
    }

    if (options.includes(OFFICES)) {
        dispatch({
            type: FETCH_OFFICES,
            payload: entity.offices
        });
    }

    if (options.includes(LISTING)) {
        dispatch({
            type: GET_SELECTED_LISTINGS,
            payload: entity.listing
        });
    }

    if (options.includes(LISTINGS)) {
        dispatch({
            type: FETCH_LISTINGS,
            payload: entity.listings
        });
    }

    if (options.includes(RESERVATIONS)) {
        dispatch({
            type: GET_SELECTED_RESERVATIONS,
            payload: entity.reservations
        });
    }

    if (options.includes(REVIEWS)) {
        dispatch({
            type: FETCH_REVIEWS,
            payload: entity.reviews
        });
    }
};
