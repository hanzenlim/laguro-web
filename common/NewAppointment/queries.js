import { gql } from 'apollo-boost';

export const requestAppointmentMutation = gql`
    mutation requestAppointment($input: RequestAppointmentInput!) {
        requestAppointment(input: $input)
    }
`;

export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            id
            patients {
                id
                firstName
                lastName
                imageUrl
                appointments(
                    options: {
                        filters: [
                            { filterKey: "dentistId", filterValues: [$id] }
                        ]
                    }
                ) {
                    id
                    localStartTime
                }
                patientImages {
                    imageUrl
                    signedImageUrl
                }
            }
            firstAppointmentDuration
            preferredLocations {
                id
                name
            }
        }
    }
`;
