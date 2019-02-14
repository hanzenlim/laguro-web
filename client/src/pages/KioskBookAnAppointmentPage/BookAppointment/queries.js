import { gql } from 'apollo-boost';
import moment from 'moment';

export const GET_OFFICE = gql`
    query($id: String!) {
        getOffice(id: $id) {
            id
            name
            listings {
                id
                reservations {
                    id
                    availableTimes {
                        startTime
                        endTime
                    }
                    reservedBy {
                        id
                    }
                }
            }
            activeDentists(
                options: {
                    rangeStart: "${moment()
                        .utc()
                        .format()}", 
                    rangeEnd: "${moment()
                        .utc()
                        .add(14, 'days')
                        .format()}"
                }
            ) {
                id
                specialty
                isHostVerified
                user {
                    firstName
                    lastName
                    imageUrl
                }
                procedures {
                    name
                }
                averageRating
                availableAppointmentSlots( 
                    options: {
                        rangeStart: "${moment()
                            .utc()
                            .format()}", 
                        rangeEnd: "${moment()
                            .utc()
                            .add(14, 'days')
                            .format()}",
                        officeId: $id
                    }
                ) {
                    startTime
                    reservationId
                }
                firstAppointmentDuration
            }
        }
    }
`;

export const CREATE_PATIENT_APPOINTMENT_ONBOARDING = gql`
    mutation CreatePatientAppointmentOnboarding(
        $input: CreatePatientAppointmentOnboardingInput!
    ) {
        createPatientAppointmentOnboarding(input: $input) {
            id
        }
    }
`;

export const GET_ACTIVE_USER = gql`
    {
        activeUser @client {
            id
        }
    }
`;
