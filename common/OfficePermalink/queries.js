import gql from 'graphql-tag';

export const UPDATE_OFFICE = gql`
    mutation updateOffice($input: UpdateOfficeInput!) {
        updateOffice(input: $input) {
            id
            permalink
        }
    }
`;
