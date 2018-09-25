import { gql } from 'apollo-boost';
import moment from 'moment';

import { STATUS, ACTIVE, END_TIME } from '../../../util/strings';

// eslint-disable-next-line
export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
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
                location {
                    name
                    geoPoint {
                        lat
                        lon
                    }
                }
            }
            appointments {
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
                firstName
                lastName
                imageUrl
            }
            reviews {
                rating
            }
            totalRating
            numReviews
            averageRating
        }
    }
`;
