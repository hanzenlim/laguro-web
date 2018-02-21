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

export const fetchDentists = () => {
	return async dispatch => {
		const dentists = await axios.get("/api/dentists");
		dispatch({
			type: FETCH_DENTISTS,
			payload: dentists
		});
	};
};

export const setFilters = filters => {
	return {
		type: SET_FILTERS,
		payload: filters
	};
};
