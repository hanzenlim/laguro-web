import React, { PureComponent } from 'react';
import { Mutation, Query } from 'react-apollo';
import moment from 'moment';

import CancelAppointmentModal from './view';
import { cancelAppointmentMutation, getPatientIdQueryClient } from './queries';
import { getAppointmentsQuery } from '../../PatientAppointments/queries';
import {
    PATIENT_ID,
    END_TIME,
    STATUS,
    ACTIVE,
    CANCELLED_BY_PATIENT,
} from '../../../../util/strings';

const refetchQueries = id => [
    {
        query: getAppointmentsQuery,
        variables: {
            input: {
                partitionKey: PATIENT_ID,
                partitionValue: id,
                options: {
                    sortKey: `${END_TIME}`,
                    rangeStart: `${moment()
                        .startOf('hour')
                        .startOf('days')
                        .format()}`,
                    filters: [
                        {
                            filterKey: `${STATUS}`,
                            filterValue: `${ACTIVE}`,
                        },
                    ],
                },
            },
        },
    },
];

class CancelAppointmentContainer extends PureComponent {
    onCancel = () => {
        this.props.toggleModalState();
    };

    render() {
        return (
            <Query query={getPatientIdQueryClient}>
                {({ data: clientData }) => (
                    <Mutation
                        mutation={cancelAppointmentMutation}
                        refetchQueries={refetchQueries(
                            clientData.activeUser.id
                        )}
                    >
                        {(cancelAppointment, { loading }) => {
                            const onSubmit = async () => {
                                await cancelAppointment({
                                    variables: {
                                        input: {
                                            id: this.props.id,
                                            cancellationType: CANCELLED_BY_PATIENT,
                                        },
                                    },
                                });
                                this.props.toggleModalState();
                            };

                            return (
                                <CancelAppointmentModal
                                    visible={this.props.visible}
                                    onCancel={this.onCancel}
                                    onSubmit={onSubmit}
                                    loading={loading}
                                />
                            );
                        }}
                    </Mutation>
                )}
            </Query>
        );
    }
}

export default CancelAppointmentContainer;
