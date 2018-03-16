import axios from "axios";
import history from "../history";
import {
	FETCH_DENTISTS,
	FETCH_OFFICES,
	FETCH_LISTINGS,
	FETCH_USER,
	SET_FILTERS,
	UPDATE_FILTERS,
	CREATE_OFFICE,
	CREATE_LISTING,
	REQUEST_OFFICES,
	REQUEST_DENTISTS
} from "./types";

export const searchDentists = filters => {
	return dispatch => {
		dispatch(setFilters(filters));
		history.push("/dentists/search");
	};
};

export const searchOffices = filters => {
	return dispatch => {
		dispatch(setFilters(filters));
		history.push("/offices/search");
	};
};

function requestOffices() {
	return {
		type: REQUEST_OFFICES
	};
}

function requestDentists() {
	return {
		type: REQUEST_DENTISTS
	};
}

export const loadAllOffices = () => {
	return axios.get(`/api/offices`);
};

export const loadAllDentists = () => {
	return axios.get(`/api/dentists`);
};

export const fetchOffices = filters => {
	return dispatch => {
		dispatch(requestOffices());
		return loadAllOffices().then(offices => {
			if (!filters.location) {
				return dispatch({
					type: FETCH_OFFICES,
					payload: offices.data
				});
			} else {
				getDistances(offices, filters).then(filteredOffices => {
					return dispatch({
						type: FETCH_OFFICES,
						payload: filteredOffices
					});
				});
			}
		});
	};
};

export const fetchDentists = filters => {
	return dispatch => {
		dispatch(requestDentists());
		return loadAllDentists().then(dentists => {
			if (!filters.location) {
				return dispatch({
					type: FETCH_DENTISTS,
					payload: dentists.data
				});
			} else {
				getDistances(dentists, filters).then(filteredDentists => {
					return dispatch({
						type: FETCH_DENTISTS,
						payload: filteredDentists
					});
				});
			}
		});
	};
};

export const getDistances = (offices, filters) => {
	return new Promise(resolve => {
		const google = window.google;

		var service = new google.maps.DistanceMatrixService();
		var officeAddresses = offices.data.map(loc => loc.location);

		service.getDistanceMatrix(
			{
				origins: [filters.location],
				destinations: officeAddresses,
				travelMode: "DRIVING",
				unitSystem: google.maps.UnitSystem.IMPERIAL
			},
			function(response, status) {
				if (status !== "OK") {
					alert("Distance Matrix failed: " + status);
				} else {
					var results = response.rows[0].elements;

					var locationsWithDistance = offices.data.map((office, index) => {
						return {
							...office,
							locationType: "office",
							distance: results[index].distance.text.split(" ")[0]
						};
					});

					resolve(locationsWithDistance);
				}
			}
		);
	});
};

export const fetchUserOffices = () => {
	return async dispatch => {
		const offices = await axios.get(`/api/user/offices`);
		dispatch({
			type: FETCH_OFFICES,
			payload: offices.data
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

export const updateProfileImage = url => {
	return async dispatch => {
		axios.patch("/api/current_user/image", {url}).then(user => {
			dispatch({
				type: FETCH_USER,
				payload: user
			});
		});
	}
}

export const updateFilters = filter => {
	return {
		type: UPDATE_FILTERS,
		payload: filter
	};
};

export const setFilters = filters => {
	return {
		type: SET_FILTERS,
		payload: filters
	};
};

export function createOffice(values) {
	return dispatch => {
		axios.post("/api/offices", values).then(offices => {
			dispatch({
				type: CREATE_OFFICE,
				payload: offices
			});
		});
		history.push("/profile");
	};
}

export function createListing(values, type) {
	return dispatch => {
		axios.post("/api/listings", values).then(listing => {
			dispatch({
				type: CREATE_LISTING,
				payload: listing
			});
		});
		history.push("/profile");
	};
}
