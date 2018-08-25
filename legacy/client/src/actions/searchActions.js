import { SET_FILTERS, UPDATE_FILTERS } from './types';
import history from '../history';

export const updateFilters = filter => {
    return {
        type: UPDATE_FILTERS,
        payload: filter
    };
};

export const setFilters = filters => ({
    type: SET_FILTERS,
    payload: filters
});

export const searchDentists = filters => dispatch => {
    dispatch(setFilters(filters));
    history.push({
        pathname: '/dentist/search',
        search: `?query=${filters.location}`
    });
};

export const searchOffices = filters => dispatch => {
    dispatch(setFilters(filters));
    history.push({
        pathname: '/office/search',
        search: `?query=${filters.location}`
    });
};
