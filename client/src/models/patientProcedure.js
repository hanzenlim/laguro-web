import makeApiCall from '../util/clientDataLoader';
import { patientProcedureFragment } from '../util/fragments';

const getPatientProcedureQuery = `
    query ($id: String!) {
        getPatientProcedure(id: $id) {
            ${patientProcedureFragment}
        }
    }
`;

const queryPatientProcedureQuery = `
    query QueryPatientProcedure($input: QueryParams!) {
        queryPatientProcedure(input: $input) {
            ${patientProcedureFragment}
        }
    }
`;

const updatePatientProcedureQuery = `
    mutation UpdatePatientProcedure($input: UpdatePatientProcedureInput!) {
        updatePatientProcedure(input: $input) {
            ${patientProcedureFragment}
        }
    }
`;

const PatientProcedure = {
    get: async procedureId => {
        if (!procedureId) {
            return null;
        }
        const response = await makeApiCall(getPatientProcedureQuery, {
            id: procedureId,
        });
        return response.data.getPatientProcedure;
    },
    query: async (partitionKey, partitionValue, options) => {
        const response = await makeApiCall(queryPatientProcedureQuery, {
            input: {
                partitionKey,
                partitionValue,
                options,
            },
        });
        return response.data.queryPatientProcedure;
    },
    update: async params => {
        const response = await makeApiCall(updatePatientProcedureQuery, {
            input: params,
        });
        return response.data.updatePatientProcedure;
    },
};

export default PatientProcedure;
