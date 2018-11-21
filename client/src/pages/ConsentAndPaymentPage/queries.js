import { gql } from 'apollo-boost';

export const getUserQuery = gql`
    {
        activeUser @client {
            id
        }
    }
`;

export const getProceduresQuery = gql`
    query QueryPatientProcedure($input: QueryParams!) {
        queryPatientProcedure(input: $input) {
            id
            status
            name
            dateCreated
            totalCost
            dentistId
        }
    }
`;

export const updatePatientProcedures = gql`
    mutation UpdatePatientProcedures($input: UpdatePatientProceduresInput!) {
        updatePatientProcedures(input: $input) {
            id
            status
        }
    }
`;

export const updatePatientProceduresStatus = gql`
    mutation UpdatePatientProceduresStatus(
        $input: UpdatePatientProceduresStatusInput!
    ) {
        updatePatientProceduresStatus(input: $input) {
            id
            status
        }
    }
`;
