import { gql } from 'apollo-boost';

export const getAppointmentsQuery = gql`
    query getAppointments($id: String!, $queryOptions: QueryOptions) {
        getUser(id: $id) {
            id
            family {
                members {
                    id
                    appointments(options: $queryOptions) {
                        id
                        patient {
                            id
                            firstName
                            lastName
                            imageUrl
                        }
                        dentist {
                            id
                            user {
                                id
                                firstName
                                lastName
                                imageUrl
                            }
                        }
                        office {
                            id
                            name
                            location {
                                name
                            }
                        }
                        startTime
                        endTime
                        localStartTime
                        localEndTime
                        status
                    }
                }
            }
        }
    }
`;
