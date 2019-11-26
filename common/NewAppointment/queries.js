import { gql } from 'apollo-boost';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import esClient from '~/lib/esClient';

export const getPatientsByDentalGroups = async ({ dentalGroups = [] }) => {
    const query = {
        bool: {
            filter: {
                terms: {
                    'dentalGroupId.keyword': dentalGroups,
                },
            },
        },
    };

    const res = await esClient.search({
        index: 'dental_group_patient_access',
        type: '_doc',
        size: 50,
        from: 0,
        body: {
            query,
        },
    });

    const list = _get(res, 'hits.hits', []);

    let patients = [];

    if (!_isEmpty(list)) {
        patients = list.map(item => ({ ...item._source.patient }));
    }

    return patients;
};

export const requestAppointmentMutation = gql`
    mutation requestAppointment($input: RequestAppointmentInput!) {
        requestAppointment(input: $input)
    }
`;

export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            id
            patients {
                id
                firstName
                lastName
                imageUrl
                appointments(
                    options: {
                        filters: [
                            { filterKey: "dentistId", filterValues: [$id] }
                        ]
                    }
                ) {
                    id
                    localStartTime
                }
                patientImages {
                    imageUrl
                    signedImageUrl
                }
            }
            firstAppointmentDuration
            preferredLocations {
                id
                name
            }
            dentalGroups {
                id
            }
        }
    }
`;
