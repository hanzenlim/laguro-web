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
                licenseNumber
                ssnOrEinOrTin
                npiNumber
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
