import { gql } from 'apollo-boost';
import moment from 'moment';

import { STATUS, ACTIVE, END_TIME } from '../../../util/strings';

// eslint-disable-next-line
export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            id
            bio
            specialty
            reservations(
                options: {
                    sortKey: "${END_TIME}",
                    rangeStart: "${moment()
                        .startOf('hour')
                        .startOf('days')}",
                    filters: [
                        {
                            filterKey: "${STATUS}",
                            filterValue: "${ACTIVE}"
                        }
                    ]
                }
            ) {
                id
                location {
                    name
                    geoPoint {
                        lat
                        lon
                    }
                }
            }
            appointments {
                id
                location {
                    name
                    geoPoint {
                        lat
                        lon
                    }
                }
            }
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
            totalRating
            numReviews
            averageRating
        }
    }
`;
