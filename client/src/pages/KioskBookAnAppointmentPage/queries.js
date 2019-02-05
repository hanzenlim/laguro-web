import { gql } from 'apollo-boost';

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
