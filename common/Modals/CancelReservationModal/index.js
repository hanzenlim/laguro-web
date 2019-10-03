import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import { Mutation } from 'react-apollo';

import CancelReservationModal from './view';
import { cancelReservationMutation } from './queries';
import { getDentistQuery } from '../../DentistAppointments/queries';

import { CANCELLED_BY_DENTIST } from '~/util/strings';
import { getUser } from '~/util/authUtils';

const refetchQueries = id => [
    {
        query: getDentistQuery,
        variables: { id },
    },
];

class CancelReservationContainer extends PureComponent {
    onCancel = () => {
        this.props.toggleModalState();
    };

    render() {
        const user = getUser();
        return (
            <Mutation
                mutation={cancelReservationMutation}
                refetchQueries={refetchQueries(_get(user, 'dentistId'))}
            >
                {(cancelReservation, { loading }) => {
                    const onSubmit = async () => {
                        await cancelReservation({
                            variables: {
                                input: {
                                    id: this.props.reservationId,
                                    cancellationType: CANCELLED_BY_DENTIST,
                                },
                            },
                        });
                        this.props.toggleModalState();
                    };

                    return (
                        <CancelReservationModal
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

export default CancelReservationContainer;
