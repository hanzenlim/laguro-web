import { gql } from 'apollo-boost';
import moment from 'moment';

import { END_TIME } from '../../../util/strings';

export const getDentistIdQueryClient = gql`
    query activeUser {
        activeUser @client {
            id
            dentistId
        }
    }
`;

export const getDentistQuery = gql`
    query getDentist($id: String!) {
        getDentist(id: $id) {
            id
            appointments {
                id
                startTime
                endTime
                patient {
                    id
                    lastName
                    firstName
                    imageUrl
                }
                status
                reservation {
                    office {
                        id
                        name
                    }
                }
            }
            reservations(
                options: {
                    sortKey: "${END_TIME}",
                    rangeStart: "${moment
                        .unix(0)
                        .utc()
                        .format()}",
                }
            ) {
                id
                office {
                    id
                    name
                    location {
                        name
                    }
                    imageUrls
                }
                localAvailableTimes {
                    startTime
                    endTime
                }
                host {
                    user {
                        firstName
                        lastName
                        imageUrl
                    }
                }
                numChairsSelected
                equipmentSelected
                appointments {
                    id
                }
                status
            }
        }
    }
`;
