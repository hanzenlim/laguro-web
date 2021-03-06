import gql from 'graphql-tag';

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
            languages
            address {
                zipCode
            }
            dentalGroups {
                id
                adminUserId
                name
            }
            dentist {
                id
                deaRegistrationNumber
                licenseNumber
                ssnOrEinOrTin
                npiNumber
                permalink
                preferredLocations {
                    id
                    name
                    location {
                        name
                    }
                    numReviews
                    averageRating
                }
                serializedPreferredLocations
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
                documents {
                    dentistPhotoId {
                        url
                        signedUrl
                        side
                    }
                    stateDentalLicense {
                        url
                        signedUrl
                    }
                    warranty {
                        url
                        signedUrl
                    }
                    dea {
                        url
                        signedUrl
                    }
                }
            }
        }
    }
`;
