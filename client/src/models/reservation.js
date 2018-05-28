import makeApiCall from '../util/clientDataLoader';
import { reservationFragment, officeFragment } from '../util/fragments';
import { CANCELLED_BY_DENTIST } from '..//util/strings';

const scanReservationsQuery = `
    scanReservations {
        ${reservationFragment}
    }
`;

const getReservationQuery = `
    query ($id: String!) {
        getReservation(id: $id) {
            ${reservationFragment}
            office {
                ${officeFragment}
            }
        }
    }
`;

const queryReservationsQuery = `
    query QueryReservations($input: QueryParams!) {
        queryReservations(input: $input) {
            ${reservationFragment}
        }
    }
`;

const createReservationQuery = `
    mutation CreateReservation($input: CreateReservationInput!) {
        createReservation(input: $input) {
            ${reservationFragment}
        }
    }
`;

const updateReservationQuery = `
    mutation UpdateReservation($input: UpdateReservationInput!) {
        updateReservation(input: $input) {
            ${reservationFragment}
        }
    }
`;

const deleteReservationQuery = `
    mutation CancelReservation($input: CancelReservationInput!) {
        cancelReservation(input: $input)
    }
`;

const Reservation = {
    scan: async () => {
        const response = await makeApiCall(scanReservationsQuery, null);
        return response.data.scanReservations;
    },
    get: async reservationId => {
        if (!reservationId) {
            return null;
        }
        const response = await makeApiCall(getReservationQuery, {
            id: reservationId
        });
        return response.data.getReservation;
    },
    query: async (
        partitionKey,
        partitionValue,
        sortKey = null,
        rangeStart = null,
        rangeEnd = null
    ) => {
        const response = await makeApiCall(queryReservationsQuery, {
            input: {
                partitionKey,
                partitionValue,
                sortKey,
                rangeStart,
                rangeEnd
            }
        });
        return response.data.queryReservations;
    },
    create: async params => {
        const response = await makeApiCall(createReservationQuery, {
            input: params
        });
        return response.data.createReservation;
    },
    update: async params => {
        const response = await makeApiCall(updateReservationQuery, {
            input: params
        });
        return response.data.updateReservation;
    },
    delete: async reservationId => {
        const response = await makeApiCall(deleteReservationQuery, {
            input: {
                id: reservationId,
                cancellationType: CANCELLED_BY_DENTIST
            }
        });
        return response.data.cancelReservation;
    }
};

export default Reservation;
