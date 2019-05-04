import { gql } from 'apollo-boost';
import _get from 'lodash/get';
import esClient from '../../../util/esClient';

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

    const dentists = _get(res, 'hits.hits') || [];

    // TODO implement some kind of score
    const randomIndex = Math.floor(Math.random() * dentists.length);

    return {
        dentist: _get(dentists[randomIndex], '_source'),
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
                }
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
