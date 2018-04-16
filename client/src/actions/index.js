import axios from "axios";
import history from "../history";
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
  CREATE_DENTIST,
  REQUEST_OFFICES,
  REQUEST_DENTISTS,
  GET_ONE_DENTIST,
  GET_SELECTED_OFFICES,
  GET_SELECTED_LISTINGS
} from "./types";

/**********************

USER ACTIONS

***********************/

export const fetchUser = () => {
  return async dispatch => {
    const user = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: user });
  };
};

export const updateProfileImage = url => {
  return async dispatch => {
    axios.patch("/api/current_user/image", { url }).then(user => {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    });
  };
};

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

/**********************

DENTIST ACTIONS

***********************/

function requestDentists() {
  return {
    type: REQUEST_DENTISTS
  };
}

export const loadAllDentists = () => {
  return axios.get(`/api/dentists`);
};

export const fetchDentists = filters => {
  return dispatch => {
    dispatch(requestDentists());
    return loadAllDentists().then(dentists => {
      if (!filters || (filters && !filters.location)) {
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

export const getOneDentist = id => {
  return async dispatch => {
    const dentist = await axios.get(`/api/dentists/${id}`);
    dispatch({
      type: GET_ONE_DENTIST,
      payload: dentist
    });
  };
};

export const getDentistByUser = id => {
  return async dispatch => {
    const dentist = await axios.get(`/api/dentists/user/${id}`);
    dispatch({
      type: GET_ONE_DENTIST,
      payload: dentist
    });
  };
}

export function editDentist(values) {
  return dispatch => {
    axios.patch(`/api/dentists`, values).then(dentists => {
      dispatch({
        type: FETCH_DENTISTS,
        payload: dentists
      });
    });
    history.push("/profile");
  };
}

export function createDentist(values) {
  return dispatch => {
    axios.post("/api/dentists", values).then(dentist => {
      dispatch({
        type: CREATE_DENTIST,
        payload: dentist
      });
    });
    history.push("/profile");
  };
}

export const putListingInCart = listing => {
  return dispatch => {
    axios.patch(`/api/dentists/cart`, listing).then(dentist => {
      dispatch({
        type: GET_ONE_DENTIST,
        payload: dentist
      });
    });
  };
};

function requestOffices() {
  return {
    type: REQUEST_OFFICES
  };
}

/**********************

OFFICE ACTIONS

***********************/

export const loadAllOffices = () => {
  return axios.get(`/api/offices`);
};

export const fetchOffices = filters => {
  return dispatch => {
    dispatch(requestOffices());
    return loadAllOffices().then(offices => {
      if (!filters || (filters && !filters.location)) {
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

export const fetchUserOffices = () => {
  return async dispatch => {
    const offices = await axios.get(`/api/user/offices`);
    dispatch({
      type: GET_SELECTED_OFFICES,
      payload: offices.data
    });
  };
};

export const getOneOffice = id => {
  return async dispatch => {
    const office = await axios.get(`/api/offices/${id}`);
    dispatch({
      type: GET_SELECTED_OFFICES,
      payload: office.data
    });
  };
};

export function editOffice(values) {
  return dispatch => {
    axios.patch(`/api/offices`, values).then(offices => {
      dispatch({
        type: FETCH_OFFICES,
        payload: offices
      });
    });
    history.push("/profile");
  };
}

export function deleteOffice(id) {
  return dispatch => {
    axios.delete(`/api/offices/${id}`).then(offices => {
      dispatch({
        type: FETCH_OFFICES,
        payload: offices.data
      });
    });
  };
}

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

/**********************

REVIEWS ACTIONS

***********************/

export const fetchAllReviews = () => {
  return async dispatch => {
    const reviews = await axios.get(`/api/reviews`);
    dispatch({
      type: FETCH_ALL_REVIEWS,
      payload: reviews.data
    });
  };
};

export const fetchReviews = id => {
  return async dispatch => {
    const reviews = await axios.get(`/api/reviews/${id}`);
    dispatch({
      type: FETCH_REVIEWS,
      payload: reviews.data
    });
  };
};

export const createReview = values => {
  return dispatch => {
    axios.post("/api/reviews", values).then(reviews => {
      dispatch({
        type: FETCH_REVIEWS,
        payload: reviews.data
      });
    });
  };
};

export function deleteReview(id) {
  return dispatch => {
    axios.delete(`/api/reviews/${id}`).then(reviews => {
      dispatch({
        type: FETCH_REVIEWS,
        payload: reviews.data
      });
    });
  };
}

/**********************

LISTING ACTIONS

***********************/

export const fetchListings = () => {
  return async dispatch => {
    const listings = await axios.get(`/api/listings`);
    dispatch({
      type: FETCH_LISTINGS,
      payload: listings
    });
  };
};

export const reserveListing = listing_id => {
  return async dispatch => {
    const reserved_listing = await axios.patch(
      `/api/listings/${listing_id}/reserve`
    );
    dispatch({
      type: GET_SELECTED_LISTINGS,
      payload: reserved_listing.data
    });
  };
};

export const getOfficeListings = office_id => {
  return async dispatch => {
    const listings = await axios.get(`/api/offices/${office_id}/listings`);
    dispatch({
      type: GET_SELECTED_LISTINGS,
      payload: listings.data
    });
  };
};

export const getOneListing = listing_id => {
  return async dispatch => {
    const listing = await axios.get(`/api/listings/${listing_id}`);
    dispatch({
      type: GET_SELECTED_LISTINGS,
      payload: listing.data
    });
  };
};

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

export function deleteListing(id) {
  return dispatch => {
    axios.delete(`/api/listings/${id}`).then(listings => {
      dispatch({
        type: FETCH_LISTINGS,
        payload: listings
      });
    });
  };
}

export function editListing(values) {
  return dispatch => {
    axios.patch(`/api/listings`, values).then(listings => {
      dispatch({
        type: FETCH_LISTINGS,
        payload: listings
      });
    });
    history.push("/profile");
  };
}

/**********************

OTHER ACTIONS

***********************/

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
