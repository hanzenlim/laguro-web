import history from '../history';
import { GET_SELECTED_LISTINGS, FETCH_LISTINGS, CREATE_LISTING } from './types';
import Listing from '../models/listing';

export const fetchListings = () => async dispatch => {
    const listings = await Listing.scan();
    dispatch({
        type: FETCH_LISTINGS,
        payload: listings
    });
};

export const queryListings = (key, value) => async dispatch => {
    const listings = await Listing.query(key, value);
    dispatch({
        type: FETCH_LISTINGS,
        payload: listings
    });
};

export const getListing = listingId => async dispatch => {
    const listing = await Listing.get(listingId);
    dispatch({
        type: GET_SELECTED_LISTINGS,
        payload: listing
    });
};

export const createListing = values => async dispatch => {
    const listing = await Listing.create(values);
    dispatch({
        type: CREATE_LISTING,
        payload: listing
    });
    history.push('/profile');
};

export const deleteListing = id => async dispatch => {
    await Listing.delete(id);
    dispatch({
        type: FETCH_LISTINGS,
        payload: null
    });
};

export const editListing = values => async dispatch => {
    const listing = await Listing.update(values);
    dispatch({
        type: GET_SELECTED_LISTINGS,
        payload: listing
    });
    history.push('/profile');
};
