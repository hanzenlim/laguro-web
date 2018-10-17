import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';

import CancelReservationModal from './view';
import { cancelReservationMutation, getDentistIdQueryClient } from './queries';
import { getDentistQuery } from '../../DentistAppointments/queries';

import { CANCELLED_BY_DENTIST } from '../../../../util/strings';

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
        return (
            <Query query={getDentistIdQueryClient}>
                {({ data: clientData }) => (
                    <Mutation
                        mutation={cancelReservationMutation}
                        refetchQueries={refetchQueries(
                            clientData.activeUser.dentistId
                        )}
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
                )}
            </Query>
        );
    }
}

export default CancelReservationContainer;
