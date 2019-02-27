import { gql } from 'apollo-boost';

export const checkUserDentistVerifiedQuery = gql`
    query($id: String!) {
        getUser(id: $id) {
            id
            dentist {
                id
                isVerified
                sentVerificationDocuments
                acceptedInsurances
                languages
                ssnOrEinOrTin
                npiNumber
                deaRegistrationNumber
            }
            firstName
            patientDocument {
                dentistPhotoId {
                    url
                }
                warranty {
                    url
                }
                stateDentalLicense {
                    url
                }
            }
        }
    }
`;

export const createReservationMutation = gql`
    mutation CreateReservation($input: CreateReservationInput!) {
        createReservation(input: $input) {
            id
            numChairsSelected
            listingId
            reservedBy {
                id
                user {
                    id
                    firstName
                    lastName
                }
            }
            equipmentSelected
            status
            totalPaid
            payment {
                id
            }
            startTime
            endTime
            dateCreated
            location {
                name
                geoPoint {
                    lat
                    lon
                }
            }
        }
    }
`;
