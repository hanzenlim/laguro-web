import axios from "axios";
import history from "../history"
import {
	FETCH_DENTISTS,
	FETCH_OFFICES,
	FETCH_LISTINGS,
	FETCH_USER,
	SET_FILTERS,
	UPDATE_FILTERS,
	CREATE_OFFICE,
	CREATE_LISTING,
} from "./types";

export const searchDentists = filters => {
	return dispatch => {
		dispatch(setFilters(filters))
		history.push('/dentists/search');
	};
};

export const searchOffices = filters => {
	return dispatch => {
		dispatch(setFilters(filters))
		history.push('/offices/search');
	};
};

export const fetchDentists = (filters) => {
	return async dispatch => {
		const google = window.google;
		axios.get(`/api/dentists`).then(dentists => {
			if(filters["location"]) {
				filterOffices(google, filters, dentists.data).then(filteredDentists => {
					dispatch({
						type: FETCH_DENTISTS,
						payload: filteredDentists
					});
				})
			} else {
				dispatch({
					type: FETCH_DENTISTS,
					payload: dentists.data
				});
			}
		})
	}
};

export const fetchOffices = (filters) => {
	return async dispatch => {
		const google = window.google;
		axios.get(`/api/offices`).then(offices => {
			if(filters["location"]) {
				filterOffices(google, filters, offices.data).then(filteredOffices => {
					dispatch({
						type: FETCH_OFFICES,
						payload: filteredOffices
					});
				})
			} else {
				dispatch({
					type: FETCH_OFFICES,
					payload: offices.data
				});
			}
		})
	}
};

export const filterOffices = (google, filters, offices) => {
	var service = new google.maps.DistanceMatrixService();
	var officeAddresses = offices.map(loc => loc.location);

	return new Promise(resolve => {
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

					var locationsWithDistance = offices.map((office, index) => {
						return {
							...office,
							locationType: "office",
							distance: results[index].distance.text.split(" ")[0]
						}
					});

					//remove any offices greater than 35 miles away
					var filteredResults = locationsWithDistance.filter(
						office => office.distance < 35
					);

					//sort offices within range, allows their labels to reflect order
					filteredResults.sort((a, b) => a.distance - b.distance);
				}

				resolve(filteredResults);
			}
		);
	});
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

export const updateFilters = filter => {
	return {
		type: UPDATE_FILTERS,
		payload: filter
	}
}

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
