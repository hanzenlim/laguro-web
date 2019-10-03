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
            office {
                id
            }
            id
            officeId
            numChairsAvailable
            chairHourlyPrice
            cleaningFee
            status
            localStartTime
            localEndTime
            startTime
            endTime
            availability {
                startDay
                endDay
                startTime
                endTime
                days
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
                        filterValues: ["ACTIVE"]
                    }
                ]
            }) {
                id
                availableTimes {
                    startTime
                    endTime
                }
                localAvailableTimes {
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
