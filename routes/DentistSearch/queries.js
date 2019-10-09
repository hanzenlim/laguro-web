import gql from 'graphql-tag';

export const batchGetUsers = (rangeStart, rangeEnd) => gql`
        query BatchGetUsers($input: BatchGetInput!) {
            batchGetUsers(input: $input) {
                id
                dentist {
                    id
                    availableAppointmentSlots(
                        options: {
                            rangeStart: "${rangeStart}",
                            rangeEnd: "${rangeEnd}",
                        }
                    ) {
                        startTime
                        reservationId
                    }
                }
            }
        }
    `;

export const GET_DENTISTS_AND_APPOINTMENT_SLOTS = gql`
    query searchForDentistsAndAppointmentSlots(
        $input: SearchForDentistsAndAppointmentSlotsInput!
    ) {
        searchForDentistsAndAppointmentSlots(input: $input) {
            dentistId
            name
            numReviews
            imageUrl
            languages
            procedures
            acceptedInsurances
            firstAppointmentDuration
            averageRating
            permalink
            bundles {
                id
                name
                group
                proceduresDetail {
                    code
                    group
                    name
                }
                insuranceList {
                    name
                    price
                }
                price
            }
            specialty
            appointmentTimeslotsByOffice {
                office {
                    id
                    name
                    location {
                        name
                        geoPoint {
                            lat
                            lon
                        }
                    }
                }
                appointmentTimeslots {
                    localStartTime
                }
            }
        }
    }
`;

export const GET_ANON_BUNDLE_GROUP_COVERAGE = gql`
    query getAnonBundleGroupCoverage($input: GetAnonBundleGroupCoverageInput!) {
        getAnonBundleGroupCoverage(input: $input) {
            id
            name
            price
            coverage
            proceduresDetail {
                name
                code
            }
            group
            insuranceName
            insurancePrice
            outOfPocket
            deductibleRemaining
            annualMaximumRemaining
        }
    }
`;
