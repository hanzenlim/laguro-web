import moment from 'moment';
import makeApiCall from '../util/clientDataLoader';
import {
    userFragment,
    dentistFragment,
    officeFragment,
    reservationFragment,
    listingFragment,
    appointmentFragment,
    reviewerFragment,
    filterActive,
    dentistProfilePageFragment
} from '../util/fragments';
import {
    USER,
    OFFICES,
    RESERVATIONS,
    LISTINGS,
    APPOINTMENTS,
    REVIEWS,
    ALL_RESERVATIONS,
    STATUS,
    ACTIVE,
    END_TIME
} from '../util/strings';

const generateDentistResult = options => {
    const userResult = options.includes(USER) ? `user{${userFragment}}` : '';
    // TODO can refactor by creating a map of string to fragment with pluralize
    // boolean
    const officeResult = options.includes(OFFICES)
        ? `offices{${officeFragment}}`
        : '';
    const reservationsResult = options.includes(RESERVATIONS)
        ? `reservations(options: {
            sortKey: "${END_TIME}",
            rangeStart: "${moment()
        .startOf('day')
        .format()}",
            filters: [
                {
                    filterKey: "${STATUS}",
                    filterValue: "${ACTIVE}"
                }
            ]
        }){
            ${reservationFragment}
            office {
                ${officeFragment}
            }
            appointments(${filterActive}) {
                ${appointmentFragment}
            }
        }`
        : '';
    const allReservationsResult = options.includes(ALL_RESERVATIONS)
        ? `reservations{
            ${reservationFragment}
            office {
                ${officeFragment}
            }
        }`
        : '';
    // TODO remove officeId once profile component has been broken down
    const listingsResult = options.includes(LISTINGS)
        ? `listings{office{id} ${listingFragment}}`
        : '';
    const appointmentsResult = options.includes(APPOINTMENTS)
        ? `appointments{${appointmentFragment}}`
        : '';
    const reviewsResult = options.includes(REVIEWS)
        ? `reviews{${reviewerFragment}}`
        : '';
    return `
        ${dentistFragment}
        ${userResult}
        ${officeResult}
        ${reservationsResult}
        ${allReservationsResult}
        ${listingsResult}
        ${appointmentsResult}
        ${reviewsResult}
    `;
};

const generateScanDentistsQuery = options => {
    return `
    query {
        scanDentists {
            ${generateDentistResult(options)}
        }
    }
`;
};

const generateGetDentistQuery = options => {
    return `
      query ($id: String!) {
          getDentist(id: $id) {
              ${generateDentistResult(options)}
          }
      }
  `;
};

const getActiveDentistsQuery = `
    query {
        getActiveDentists {
            dentist {
                ${dentistFragment}
                user {
                    ${userFragment}
                }
                reviews {
                    ${reviewerFragment}
                }
            }
            reservations {
                ${reservationFragment}
            }
        }
    }
`;

const createDentistQuery = `
    mutation CreateDentist($input: CreateDentistInput!) {
        createDentist(input: $input) {
            ${dentistFragment}
            reviews {
                id
            }
            offices {
                id
            }
            reservations {
                id
            }
        }
    }
`;

const updateDentistQuery = `
    mutation UpdateDentist($input: UpdateDentistInput!) {
        updateDentist(input: $input) {
            ${dentistProfilePageFragment}
        }
    }
`;

const Dentist = {
    scan: async options => {
        const scanDentistsQuery = generateScanDentistsQuery(options);
        const response = await makeApiCall(scanDentistsQuery, null);
        return response.data.scanDentists;
    },
    getActive: async () => {
        const response = await makeApiCall(getActiveDentistsQuery, null);
        return response.data.getActiveDentists;
    },
    get: async (dentistId, options) => {
        if (!dentistId) {
            return null;
        }
        const getDentistQuery = generateGetDentistQuery(options);
        const response = await makeApiCall(getDentistQuery, { id: dentistId });
        return response.data.getDentist;
    },
    create: async params => {
        const response = await makeApiCall(createDentistQuery, {
            input: params
        });
        return response.data.createDentist;
    },
    update: async params => {
        const response = await makeApiCall(updateDentistQuery, {
            input: params
        });
        return response.data.updateDentist;
    }
};

export default Dentist;
