import { gql } from 'apollo-boost';

export const updateDentist = gql`
    mutation updateDentist($input: UpdateDentistInput!) {
        updateDentist(input: $input) {
            id
            preferredLocations {
                name
                id
                location {
                    name
                }
                numReviews
                averageRating
            }
        }
    }
`;
