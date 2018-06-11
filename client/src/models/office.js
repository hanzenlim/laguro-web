import makeApiCall from '../util/clientDataLoader';
import { LISTINGS, REVIEWS } from '../util/strings';
import {
    officeFragment,
    listingFragment,
    reviewerFragment
} from '../util/fragments';

const generateOfficeResult = options => {
    const listingsResult = options.includes(LISTINGS)
        ? `listings{office{id} ${listingFragment}}`
        : '';
    const reviewsResult = options.includes(REVIEWS)
        ? `reviews{${reviewerFragment}}`
        : '';
    return `
        ${officeFragment}
        ${listingsResult}
        ${reviewsResult}
    `;
};

const generateScanOfficesQuery = options => {
    return `
        query {
            scanOffices {
                ${generateOfficeResult(options)}
            }
        }
    `;
};

const generateGetOfficeQuery = options => {
    return `
        query ($id: String!) {
            getOffice(id: $id) {
                ${generateOfficeResult(options)}
            }
        }
    `;
};

const queryOfficesQuery = `
    query QueryOffices($input: QueryParams!) {
        queryOffices(input: $input) {
            ${officeFragment}
        }
    }
`;

const createOfficeQuery = `
    mutation CreateOffice($input: CreateOfficeInput!) {
        createOffice(input: $input) {
            ${officeFragment}
        }
    }
`;

const updateOfficeQuery = `
    mutation UpdateOffice($input: UpdateOfficeInput!) {
        updateOffice(input: $input) {
            ${officeFragment}
        }
    }
`;

const deleteOfficeQuery = `
    mutation DeleteOffice($id: String!) {
        deleteOffice(id: $id)
    }
`;

const Office = {
    scan: async options => {
        const scanOfficesQuery = generateScanOfficesQuery(options);
        const response = await makeApiCall(scanOfficesQuery, null);
        return response.data.scanOffices;
    },
    query: async (partitionKey, partitionValue, options) => {
        const response = await makeApiCall(queryOfficesQuery, {
            input: {
                partitionKey,
                partitionValue,
                options
            }
        });
        return response.data.queryOffices;
    },
    get: async (officeId, options) => {
        if (!officeId) {
            return null;
        }
        const getOfficeQuery = generateGetOfficeQuery(options);
        const response = await makeApiCall(getOfficeQuery, { id: officeId });
        return response.data.getOffice;
    },
    create: async params => {
        const response = await makeApiCall(createOfficeQuery, {
            input: params
        });
        return response.data.createOffice;
    },
    update: async params => {
        const response = await makeApiCall(updateOfficeQuery, {
            input: params
        });
        return response.data.updateOffice;
    },
    delete: async officeId => {
        const response = await makeApiCall(deleteOfficeQuery, { id: officeId });
        return response.data.deleteOffice;
    }
};

export default Office;
