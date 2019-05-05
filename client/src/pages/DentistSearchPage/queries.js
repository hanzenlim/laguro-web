import { gql } from 'apollo-boost';

export const batchGetUsers = (rangeStart, rangeEnd) => gql`
        query BatchGetUsers($input: BatchGetInput!) {
            batchGetUsers(input: $input) {
                id
                dentist {
                    id
                    availableAppointmentSlots(
                        options: {
                            rangeStart: "${rangeStart}",
                            rangeEnd: "${rangeEnd}",
                        }
                    ) {
                        startTime
                        reservationId
                    }
                }
            }
        }
    `;

export const GET_DENTISTS_AND_APPOINTMENT_SLOTS = gql`
    query searchForDentistsAndAppointmentSlots(
        $input: SearchForDentistsAndAppointmentSlotsInput!
    ) {
        searchForDentistsAndAppointmentSlots(input: $input) {
            dentistId
            name
            numReviews
            imageUrl
            languages
            procedures
            acceptedInsurances
            firstAppointmentDuration
            averageRating
            bundles {
                id
                name
                group
                proceduresDetail {
                    code
                    group
                    name
                }
                insuranceList {
                    name
                    price
                }
                price
            }
            specialty
            appointmentTimeslotsByOffice {
                office {
                    id
                    name
                    location {
                        name
                        geoPoint {
                            lat
                            lon
                        }
                    }
                }
                appointmentTimeslots {
                    localStartTime
                }
            }
        }
    }
`;
