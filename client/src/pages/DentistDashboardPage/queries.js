import { gql } from 'apollo-boost';

export const getUserQuery = gql`
    query($id: String!) {
        getUser(id: $id) {
            id
            firstName
            lastName
            middleName
            isVerified
            dentistId
            isHost
            isDentist
            address {
                zipCode
            }
            dentist {
                id
                deaRegistrationNumber
                preferredLocations {
                    id
                    name
                    location {
                        name
                    }
                    numReviews
                    averageRating
                }
                offices {
                    id
                    name
                    location {
                        addressDetails
                        name
                    }
                    numReviews
                    averageRating
                }
                bio
                specialty
                languages
                npiNumber
                acceptedInsurances
                procedures {
                    group
                }
                user {
                    id
                    firstName
                    lastName
                    imageUrl
                }
                reviews {
                    id
                    rating
                }       
            }
        }
    }
`;
