import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import { Mutation } from 'react-apollo';
import moment from 'moment';

import CancelAppointmentModal from './view';
import { cancelAppointmentMutation } from './queries';
import { getAppointmentsQuery } from '../../PatientAppointments/queries';
import {
    PATIENT_ID,
    END_TIME,
    STATUS,
    ACTIVE,
    CANCELLED_BY_PATIENT,
} from '../../../../util/strings';
import { getUser } from '../../../../util/authUtils';

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
                        .startOf('days')
                        .format()}`,
                    filters: [
                        {
                            filterKey: `${STATUS}`,
                            filterValues: [`${ACTIVE}`],
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
        const user = getUser();
        return (
            <Mutation
                mutation={cancelAppointmentMutation}
                refetchQueries={refetchQueries(_get(user, 'id'))}
            >
                {(cancelAppointment, { loading }) => {
                    const onSubmit = async () => {
                        await cancelAppointment({
                            variables: {
                                input: {
                                    id: this.props.id,
                                    cancellationType: this.props
                                        .cancellationType,
                                },
                            },
                        });
                        this.props.toggleModalState();
                    };

                    return (
                        <CancelAppointmentModal
                            cancellationType={this.props.cancellationType}
                            visible={this.props.visible}
                            onCancel={this.onCancel}
                            onSubmit={onSubmit}
                            loading={loading}
                        />
                    );
                }}
            </Mutation>
        );
    }
}

CancelAppointmentContainer.defaultProps = {
    cancellationType: CANCELLED_BY_PATIENT,
};

export default CancelAppointmentContainer;
