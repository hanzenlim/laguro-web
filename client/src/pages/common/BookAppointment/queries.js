import { gql } from 'apollo-boost';
import _get from 'lodash/get';
import esClient from '../../../util/esClient';

let suggestedDentist = null;
export const getSuggestedDentist = async args => {
    const { officeId } = args;

    const query = {
        bool: {
            must: [
                {
                    term: {
                        'appointmentAvailability.officeId.keyword': {
                            value: officeId,
                        },
                    },
                },
            ],
            filter: { term: { isVerified: true } },
        },
    };

    const res = await esClient.search({
        index: 'dentists',
        type: '_doc',
        size: 20,
        from: 0,
        body: {
            query,
        },
    });

    let dentists = _get(res, 'hits.hits') || [];
    if (suggestedDentist && suggestedDentist._id) {
        dentists = dentists.filter(item => item._id !== suggestedDentist._id);
    }

    const randomIndex = Math.floor(Math.random() * dentists.length);
    suggestedDentist = dentists[randomIndex];

    return {
        dentist: _get(suggestedDentist, '_source'),
        total: _get(res, 'hits.total'),
    };
};

export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            id
            preferredLocations {
                id
                timezone
                location {
                    name
                    geoPoint {
                        lat
                        lon
                    }
                    addressDetails
                }
            }
            user {
                id
                firstName
                lastName
            }
        }
    }
`;

export const getDentistAppointmentSlotsQuery = gql`
    query getDentistAppointmentSlots($input: GetDentistAppointmentSlotsInput!) {
        getDentistAppointmentSlots(input: $input) {
            office {
                id
            }
            appointmentTimeslots {
                localStartTime
            }
        }
    }
`;

export const createAppointmentMutation = gql`
    mutation CreateAppointment($input: CreateAppointmentInput!) {
        createAppointment(input: $input)
    }
`;

export const getUserQuery = gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            family {
                members {
                    id
                    firstName
                    lastName
                    imageUrl
                    relationshipToPrimary
                }
            }
        }
    }
`;
