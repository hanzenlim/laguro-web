import { gql } from 'apollo-boost';
import moment from 'moment';
import { STATUS, ACTIVE, END_TIME } from '../../../../util/strings';

export const GET_FAMILY_MEMBERS = gql`
    query($id: String!) {
        getUser(id: $id) {
            id
            family {
                primaryUser {
                    id
                }
                members {
                    id
                    firstName
                    lastName
                    imageUrl
                    relationshipToPrimary
                    appointments(
                        options: {
                            sortKey: "${END_TIME}",
                            rangeStart:"${moment()
                                .startOf('day')
                                .utc()
                                .format()}",
                            filters: [
                                    {
                                        filterKey: "${STATUS}",
                                        filterValues: ["${ACTIVE}"]
                                    }
                                ]
                            }
                        )
                        {
                            id
                            dentist {
                                id
                                user {
                                    firstName
                                    lastName
                                }
                            }
                            localStartTime
                    }
                }
            }
        }
    }
`;

// rangeEnd: "${moment()
//     .endOf('day')
//     .utc()
//     .format()}",
// filters: [
//     {
//         filterKey: "${STATUS}",
//         filterValues: ["${ACTIVE}"]
//     }
// ]
