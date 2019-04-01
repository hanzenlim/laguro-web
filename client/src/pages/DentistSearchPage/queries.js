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
