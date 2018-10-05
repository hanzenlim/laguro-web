import { gql } from 'apollo-boost';
import moment from 'moment';

export const getOfficeEquipments = gql`
    query($id: String!) {
        getOffice(id: $id) {
            id
            equipment {
                name
                price
            }
        }
    }
`;

export const getListingQuery = gql`
    query QueryListing($input: QueryParams!) {
        queryListings(input: $input) {
            office{id}
            id
            officeId
            numChairsAvailable
            chairHourlyPrice
            cleaningFee
            status
            startTime
            endTime
            availability {
                startDay
                endDay
                startTime
                endTime
            }
            dateCreated
            reservations(options: {
                sortKey: "endTime",
                rangeStart: "${moment()
                    .startOf('hour')
                    .startOf('days')
                    .format()}",
                filters: [
                    {
                        filterKey: "status",
                        filterValue: "ACTIVE"
                    }
                ]
            }) {
                id
                availableTimes {
                    startTime
                    endTime
                }
                numChairsSelected
                status
            }
        }
    }
`;

export const getNumRemainingChairsQuery = gql`
    query($input: GetNumRemainingChairsInput!) {
        getNumRemainingChairs(input: $input)
    }
`;
