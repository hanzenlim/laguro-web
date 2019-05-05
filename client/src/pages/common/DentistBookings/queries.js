import { gql } from 'apollo-boost';
import { STATUS, ACTIVE } from '../../../util/strings';

export const updateAppointmentMutation = gql`
    mutation updateAppointmentTime($input: UpdateAppointmentTimeInput!) {
        updateAppointmentTime(input: $input)
    }
`;

export const getDentistQuery = gql`
    query getDentist($id: String!) {
        getDentist(id: $id) {
            id
            preferredLocations {
                id
                name
                location {
                    name
                }
                host {
                    user {
                        id
                        firstName
                        lastName
                    }
                }
                listings (
                    options: {
                        filters: [
                            {
                                filterKey: "${STATUS}",
                                filterValues: ["${ACTIVE}"]
                            }
                        ]
                    }
                ) {
                    id
                    numChairsAvailable
                    availability {
                        startDay
                        endDay
                        startTime
                        endTime
                        type
                        days
                    }
                    status
                }
                imageUrls
                equipment {
                    name
                }
            }
            appointments {
                id
                localStartTime
                localEndTime
                listingId
                patient {
                    id
                    lastName
                    firstName
                    imageUrl
                }
                status
                office {
                    id
                    name
                }
                notes
            }
        }
    }
`;
