import makeApiCall from '../util/clientDataLoader';
import {
    listingFragment,
    dentistFragment,
    officeFragment,
    reviewerFragment,
} from '../util/fragments';

const scanListingsQuery = `
    query {
        scanListings {
            ${listingFragment}
            office {
                ${officeFragment}
                reviews {
                    ${reviewerFragment}
                }
            }
        }
    }
`;

const getActiveListingsQuery = `
    query {
        getActiveListings {
            ${listingFragment}
            office {
                ${officeFragment}
                reviews {
                    ${reviewerFragment}
                }
            }
        }
    }
`;

const getListingQuery = `
    query ($id: String!) {
        getListing(id: $id) {
            ${listingFragment}
            reservations {
                id
            }
            host {
                ${dentistFragment}
            }
            office {
                ${officeFragment}
                reviews {
                    ${reviewerFragment}
                }
            }
        }
    }
`;

const queryListingsQuery = `
    query QueryListing($input: QueryParams!) {
        queryListings(input: $input) {
            office{id}
            ${listingFragment}
            reservations {
                id
                startTime
                endTime
                status
            }
        }
    }
`;

const createListingQuery = `
    mutation CreateListing($input: CreateListingInput!) {
        createListing(input: $input) {
            ${listingFragment}
        }
    }
`;

const updateListingQuery = `
    mutation UpdateListing($input: UpdateListingInput!) {
        updateListing(input: $input) {
            ${listingFragment}
        }
    }
`;

const deleteListingQuery = `
    mutation DeleteListing($id: String!) {
        deleteListing(id: $id)
    }
`;

const Listing = {
    scan: async () => {
        const response = await makeApiCall(scanListingsQuery, null);
        return response.data.scanListings;
    },
    query: async (partitionKey, partitionValue, options) => {
        const response = await makeApiCall(queryListingsQuery, {
            input: {
                partitionKey,
                partitionValue,
                options
            }
        });
        return response.data.queryListings;
    },
    get: async listingId => {
        if (!listingId) {
            return null;
        }
        const response = await makeApiCall(getListingQuery, { id: listingId });
        return response.data.getListing;
    },
    getActive: async () => {
        const response = await makeApiCall(getActiveListingsQuery, null);
        return response.data.getActiveListings;
    },
    create: async params => {
        const response = await makeApiCall(createListingQuery, {
            input: params
        });
        return response.data.createListing;
    },
    update: async params => {
        const response = await makeApiCall(updateListingQuery, {
            input: params
        });
        return response.data.updateListingQuery;
    },
    delete: async listingId => {
        const response = await makeApiCall(deleteListingQuery, {
            id: listingId
        });
        return response.data.deleteListing;
    }
};

export default Listing;
