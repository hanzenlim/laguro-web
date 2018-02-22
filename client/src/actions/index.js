import axios from "axios";
import history from "../history"
import { FETCH_DENTISTS, SET_FILTERS } from "./types";

export const searchDentists = filters => {
	fetchDentists();
	return dispatch => {
		dispatch(setFilters(filters))
		history.push('/dentist/search');
	};
};

export const searchListings = filters => {
	fetchListings();
	return dispatch => {
		dispatch(setFilters(filters))
		history.push('/office/search');
	};
};

export const fetchDentists = () => {
	return async dispatch => {
		const dentists = await axios.get("/api/dentists");
		dispatch({
			type: FETCH_DENTISTS,
			payload: dentists
		});
	};
};

export const fetchListings = () => {
	return async dispatch => {
		const listings = await axios.get(`/api/listings`);
		dispatch({
			type: FETCH_LISTINGS,
			payload: listings
		});
	};
};

export const setFilters = filters => {
	return {
		type: SET_FILTERS,
		payload: filters
	};
};
