import axios from 'axios';
import cookies from 'browser-cookies';

import {
    FETCH_DENTISTS,
    FETCH_OFFICES,
    FETCH_LISTINGS,
    FETCH_USER,
    FETCH_REVIEWS,
    FETCH_ALL_REVIEWS,
    SET_FILTERS,
    UPDATE_FILTERS,
    CREATE_OFFICE,
    CREATE_LISTING,
    REQUEST_OFFICES,
    REQUEST_DENTISTS,
    REQUEST_LISTINGS,
    GET_ONE_DENTIST,
    GET_SELECTED_OFFICES,
    GET_SELECTED_LISTINGS,
    GET_SELECTED_RESERVATIONS,
} from './types';
import { makeQuery, getUserQuery, getUserVariable } from '../util/clientDataLoader';
import history from '../history';

export const fetchUser = () => async (dispatch) => {
    const userId = cookies.get('userId');

    if (userId) {
        const user = await makeQuery(getUserQuery, getUserVariable(userId));
        dispatch({ type: FETCH_USER, payload: user });
    } else {
        dispatch({ type: FETCH_USER, payload: { data: '' } });
    }
};

export const updateProfileImage = url => async (dispatch) => {
    axios.patch('/api/current_user/image', { url }).then((user) => {
        dispatch({
            type: FETCH_USER,
            payload: user,
        });
    });
};

export const updateFilters = filter => ({
    type: UPDATE_FILTERS,
    payload: filter,
});

export const setFilters = filters => ({
    type: SET_FILTERS,
    payload: filters,
});

export const searchDentists = filters => (dispatch) => {
    dispatch(setFilters(filters));
    history.push({ pathname: '/dentists/search', search: `?query=${filters.location}` });
};

export const searchOffices = filters => (dispatch) => {
    dispatch(setFilters(filters));
    history.push({ pathname: '/offices/search', search: `?query=${filters.location}` });
};

/** ********************

DENTIST ACTIONS

********************** */

function requestDentists() {
    return {
        type: REQUEST_DENTISTS,
    };
}

export const loadAllDentists = () => axios.get('/api/dentists');

export const fetchDentists = filters => (dispatch) => {
    dispatch(requestDentists());
    return loadAllDentists().then((dentists) => {
        if (!filters || (filters && !filters.location)) {
            return dispatch({
                type: FETCH_DENTISTS,
                payload: dentists.data,
            });
        }
        getDistances(dentists, filters).then(filteredDentists => dispatch({
            type: FETCH_DENTISTS,
            payload: filteredDentists,
        }));
    });
};

export const getOneDentist = id => async (dispatch) => {
    dispatch(requestDentists());
    const dentist = await axios.get(`/api/dentists/${id}`);
    dispatch({
        type: GET_ONE_DENTIST,
        payload: dentist,
    });
};

export const getDentistByUser = id => async (dispatch) => {
    dispatch(requestDentists());
    const dentist = await axios.get(`/api/dentists/user/${id}`);
    dispatch({
        type: GET_ONE_DENTIST,
        payload: dentist,
    });
};

export function editDentist(values) {
    return (dispatch) => {
        axios.patch('/api/dentists', values).then((dentists) => {
            dispatch({
                type: FETCH_DENTISTS,
                payload: dentists,
            });
        });
        history.push('/profile');
    };
}

export function createDentist(values) {
    return (dispatch) => {
        axios.post('/api/dentists', values).then((dentist) => {
            dispatch({
                type: GET_ONE_DENTIST,
                payload: dentist,
            });
        });
        history.push('/profile');
    };
}

export const putListingInCart = listing => (dispatch) => {
    axios.patch('/api/dentists/cart', listing).then((dentist) => {
        dispatch({
            type: GET_ONE_DENTIST,
            payload: dentist,
        });
    });
};

/** ********************

OFFICE ACTIONS

********************** */

function requestOffices() {
    return {
        type: REQUEST_OFFICES,
    };
}

export const loadAllOffices = () => axios.get('/api/offices');

export const fetchOffices = filters => (dispatch) => {
    dispatch(requestOffices());
    return loadAllOffices().then((offices) => {
        if (!filters || (filters && !filters.location)) {
            return dispatch({
                type: FETCH_OFFICES,
                payload: offices.data,
            });
        }
        getDistances(offices, filters).then(filteredOffices => dispatch({
            type: FETCH_OFFICES,
            payload: filteredOffices,
        }));
    });
};

export const fetchUserOffices = () => async (dispatch) => {
    dispatch(requestOffices());
    const offices = await axios.get('/api/user/offices');
    dispatch({
        type: GET_SELECTED_OFFICES,
        payload: offices.data,
    });
};

export const getOneOffice = id => async (dispatch) => {
    dispatch(requestOffices());
    const office = await axios.get(`/api/offices/${id}`);
    dispatch({
        type: GET_SELECTED_OFFICES,
        payload: office.data,
    });
};

export function editOffice(values) {
    return (dispatch) => {
        dispatch(requestOffices());
        axios.patch('/api/offices', values).then((offices) => {
            dispatch({
                type: GET_SELECTED_OFFICES,
                payload: offices.data,
            });
        });
        history.push('/profile');
    };
}

export function deleteOffice(id) {
    return (dispatch) => {
        axios.delete(`/api/offices/${id}`).then((offices) => {
            dispatch({
                type: FETCH_OFFICES,
                payload: offices.data,
            });
        });
    };
}

export function createOffice(values) {
    return (dispatch) => {
        axios.post('/api/offices', values).then((offices) => {
            dispatch({
                type: CREATE_OFFICE,
                payload: offices,
            });
        });
        history.push('/profile');
    };
}

/** ********************

REVIEWS ACTIONS

********************** */

export const fetchAllReviews = () => async (dispatch) => {
    const reviews = await axios.get('/api/reviews');
    dispatch({
        type: FETCH_ALL_REVIEWS,
        payload: reviews.data,
    });
};

export const fetchReviews = id => async (dispatch) => {
    const reviews = await axios.get(`/api/reviews/${id}`);
    dispatch({
        type: FETCH_REVIEWS,
        payload: reviews.data,
    });
};

export const createReview = values => (dispatch) => {
    axios.post('/api/reviews', values).then((reviews) => {
        dispatch({
            type: FETCH_REVIEWS,
            payload: reviews.data,
        });
    });
};

export function deleteReview(id) {
    return (dispatch) => {
        axios.delete(`/api/reviews/${id}`).then((reviews) => {
            dispatch({
                type: FETCH_REVIEWS,
                payload: reviews.data,
            });
        });
    };
}

/** ********************

RESERVATION ACTIONS

********************** */

export const createReservation = details => async (dispatch) => {
    const reserved_listing = await axios.post('/api/reservations', details);
    dispatch({
        type: GET_SELECTED_LISTINGS,
        payload: reserved_listing.data,
    });
};

export const fetchUserReservations = () => async (dispatch) => {
    const user_reservations = await axios.get('/api/reservations/user');
    dispatch({
        type: GET_SELECTED_RESERVATIONS,
        payload: user_reservations.data,
    });
};

export const fetchDentistReservations = dentist_id => async (dispatch) => {
    const dentist_reservations = await axios.get(`/api/reservations/dentist/${dentist_id}`);
    dispatch({
        type: GET_SELECTED_RESERVATIONS,
        payload: dentist_reservations.data,
    });
};

export const deleteReservation = reservation_id => async (dispatch) => {
    const user_reservations = await axios.delete(`/api/reservations/${reservation_id}`);
    dispatch({
        type: GET_SELECTED_RESERVATIONS,
        payload: user_reservations.data,
    });
};

// call this function with no patient_id to cancel appt
export const reserveAppointment = (reserv_id, appt_id, patient_id = undefined) => (dispatch) => {
    axios.patch(`/api/reservations/${reserv_id}/appointments`, { appt_id, patient_id }).then((user_reservations) => {
        dispatch({
            type: GET_SELECTED_RESERVATIONS,
            payload: user_reservations.data,
        });
    });
};

/** ********************

LISTING ACTIONS

********************** */

function requestListings() {
    return {
        type: REQUEST_LISTINGS,
    };
}

export const fetchListings = () => async (dispatch) => {
    dispatch(requestListings());
    const listings = await axios.get('/api/listings');
    dispatch({
        type: FETCH_LISTINGS,
        payload: listings.data,
    });
};

export const getOfficeListings = office_id => async (dispatch) => {
    dispatch(requestListings());
    const listings = await axios.get(`/api/offices/${office_id}/listings`);
    dispatch({
        type: GET_SELECTED_LISTINGS,
        payload: listings.data,
    });
};

export const getOneListing = listing_id => async (dispatch) => {
    dispatch(requestOffices());
    const listing = await axios.get(`/api/listings/${listing_id}`);
    dispatch({
        type: GET_SELECTED_LISTINGS,
        payload: listing.data,
    });
};

export function createListing(values) {
    return (dispatch) => {
        axios.post('/api/listings', values).then((listing) => {
            dispatch({
                type: CREATE_LISTING,
                payload: listing,
            });
        });
        history.push('/profile');
    };
}

export function deleteListing(id) {
    return (dispatch) => {
        axios.delete(`/api/listings/${id}`).then((listings) => {
            dispatch({
                type: FETCH_LISTINGS,
                payload: listings.data,
            });
        });
    };
}

export function editListing(values) {
    return (dispatch) => {
        axios.patch('/api/listings', values).then((listings) => {
            dispatch({
                type: FETCH_LISTINGS,
                payload: listings.data,
            });
        });
        history.push('/profile');
    };
}

/** ********************

OTHER ACTIONS

********************** */

export const getDistances = (offices, filters) => new Promise((resolve) => {
    const google = window.google;

    const service = new google.maps.DistanceMatrixService();
    const officeAddresses = offices.data.map(loc => loc.location);

    service.getDistanceMatrix(
        {
            origins: [filters.location],
            destinations: officeAddresses,
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.IMPERIAL,
        },
        (response, status) => {
            if (status !== 'OK') {
                alert(`Distance Matrix failed: ${status}`);
            } else {
                const results = response.rows[0].elements;

                const locationsWithDistance = offices.data.map((office, index) => ({
                    ...office,
                    locationType: 'office',
                    distance: results[index].distance.text.split(' ')[0],
                }));

                resolve(locationsWithDistance);
            }
        },
    );
});
