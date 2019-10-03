
import { gql } from 'apollo-boost';

export const GET_DENTIST_PINCODE_QUERY = gql`
    query($dentistId: String!) {
        getDentistPosPincode(dentistId: $dentistId) 
    }
`;

export const GENERATE_NEW_PINCODE_MUTATION = gql`
    mutation($dentistId: String!) {
        generatePosPincode(dentistId: $dentistId)
    }
`;