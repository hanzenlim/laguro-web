import history from '../history';
import { GET_SELECTED_LISTINGS, FETCH_LISTINGS, CREATE_LISTING } from './types';
import Listing from '../models/listing';

export const fetchListings = (active = false) => async dispatch => {
    const listings = active ? await Listing.getActive() : await Listing.scan();
    dispatch({
        type: FETCH_LISTINGS,
        payload: listings
    });
};

export const queryListings = (key, value, sortKey = null, rangeStart = null, rangeEnd = null) => async dispatch => {
    const listings = await Listing.query(key, value, sortKey, rangeStart, rangeEnd);
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

export const cancelListing = listingId => async () => {
    await Listing.delete(listingId);
};

export const editListing = values => async dispatch => {
    const listing = await Listing.update(values);
    dispatch({
        type: GET_SELECTED_LISTINGS,
        payload: listing
    });
    history.push('/profile');
};
