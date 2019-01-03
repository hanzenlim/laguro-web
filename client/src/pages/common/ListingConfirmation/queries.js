import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getOfficeQuery = gql`
    query($id: String!) {
        getOffice(id: $id) {
            id
            name
            location {
                name
                addressDetails
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
                    days
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
