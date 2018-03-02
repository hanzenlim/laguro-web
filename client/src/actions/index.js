import axios from "axios";
import history from "../history"
import {
	FETCH_DENTISTS,
	FETCH_OFFICES,
	FILTER_OFFICES,
	FETCH_LISTINGS,
	FETCH_USER,
	SET_FILTERS,
	CREATE_OFFICE,
	CREATE_LISTING,
} from "./types";

export const searchDentists = filters => {
	fetchDentists();
	return dispatch => {
		dispatch(setFilters(filters))
		history.push('/dentists/search');
	};
};

export const searchOffices = filters => {
	fetchOffices();
	return dispatch => {
		dispatch(setFilters(filters))
		history.push('/offices/search');
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

export const fetchOffices = () => {
	return async dispatch => {
		const offices = await axios.get(`/api/offices`);
		dispatch({
			type: FETCH_OFFICES,
			payload: offices
		});
	};
};

export const updateOfficeList = (offices) => {
	return dispatch => {
		dispatch({
			type: FILTER_OFFICES,
			payload: offices
		})
	}
}

export const fetchUserOffices = () => {
	return async dispatch => {
		const offices = await axios.get(`/api/user/offices`);
		dispatch({
			type: FETCH_OFFICES,
			payload: offices
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

export const fetchUser = () => {
	return async dispatch => {
		const user = await axios.get("/api/current_user");
		dispatch({ type: FETCH_USER, payload: user });
	};
};

export const setFilters = filters => {
	return {
		type: SET_FILTERS,
		payload: filters
	};
};

export function createOffice(values, type) {
	return dispatch => {
		axios.post("/api/offices", values).then(offices => {
      dispatch({
        type: CREATE_OFFICE,
        payload: offices
      })
		});
		history.push('/profile');
	}
}

export function createListing(values, type) {
	return dispatch => {
		axios.post("/api/listings", values).then(listing => {
      dispatch({
        type: CREATE_LISTING,
        payload: listing
      })
		});
		history.push('/profile');
	}
}
