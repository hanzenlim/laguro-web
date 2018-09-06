import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            bio
            specialty
            location {
                name
            }
            procedures {
                name
            }
            user {
                firstName
                lastName
                imageUrl
            }
            reviews {
                rating
            }
        }
    }
`;
