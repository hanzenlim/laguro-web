import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getOfficeQuery = gql`
    query($id: String!) {
        getOffice(id: $id) {
            id
            name
            location {
                name
            }
            equipment {
                name
            }
            listings {
                id
                availability {
                    startDay
                    endDay
                    startTime
                    endTime
                }
                localStartTime
                localEndTime
                cleaningFee
                numChairsAvailable
                chairHourlyPrice
            }
        }
    }
`;
