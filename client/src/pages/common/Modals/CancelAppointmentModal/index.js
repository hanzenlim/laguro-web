import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';

import CancelAppointmentModal from './view';
import { cancelAppointmentMutation } from './queries';
import { CANCELLED_BY_PATIENT } from '../../../../util/strings';
import { appointmentClient } from '../../../../util/apolloClients';
import { trackBookAppointment } from '../../../../util/trackingUtils';
import { getUser } from '../../../../util/authUtils';

class CancelAppointmentContainer extends PureComponent {
    onCancel = () => {
        this.props.toggleModalState();
    };

    render() {
        const { refetch } = this.props;
        const user = getUser();
        return (
            <Mutation
                mutation={cancelAppointmentMutation}
                client={appointmentClient}
            >
                {(cancelAppointment, { loading }) => {
                    const onSubmit = async () => {
                        await cancelAppointment({
                            variables: {
                                input: {
                                    appointmentId: this.props.id,
                                    cancellationType: this.props
                                        .cancellationType,
                                },
                            },
                        });

                        trackBookAppointment({
                            dentistId: user.dentistId,
                            appointmentId: this.props.id,
                            eventAction: 'Cancel',
                        });

                        refetch && (await refetch());
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
