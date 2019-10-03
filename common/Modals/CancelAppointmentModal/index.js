import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';

import CancelAppointmentModal from './view';
import {
    withdrawAppointmentRequestMutation,
    cancelAppointmentMutation,
} from './queries';
import { CANCELLED_BY_PATIENT } from '~/util/strings';
import { trackBookAppointment } from '~/util/trackingUtils';
import { getUser } from '~/util/authUtils';

const Composed = adopt({
    withdrawAppointmentRequest: ({ render }) => (
        <Mutation
            mutation={withdrawAppointmentRequestMutation}
            context={{ clientName: 'appointment' }}
        >
            {render}
        </Mutation>
    ),
    cancelAppointment: ({ render }) => (
        <Mutation
            mutation={cancelAppointmentMutation}
            context={{ clientName: 'appointment' }}
        >
            {render}
        </Mutation>
    ),
});

class CancelAppointmentContainer extends PureComponent {
    onCancel = () => {
        this.props.toggleModalState();
    };

    render() {
        const { refetch } = this.props;
        const user = getUser();
        return (
            <Composed>
                {({ withdrawAppointmentRequest, cancelAppointment }) => {
                    const onSubmit = async () => {
                        if (this.props.isPendingAppointment) {
                            await withdrawAppointmentRequest({
                                variables: {
                                    input: {
                                        appointmentId: this.props.id,
                                    },
                                },
                            });
                        } else {
                            await cancelAppointment({
                                variables: {
                                    input: {
                                        appointmentId: this.props.id,
                                        cancellationType: this.props
                                            .cancellationType,
                                    },
                                },
                            });
                        }

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
                            loading={
                                withdrawAppointmentRequest.loading ||
                                cancelAppointment.loading
                            }
                        />
                    );
                }}
            </Composed>
        );
    }
}

CancelAppointmentContainer.defaultProps = {
    cancellationType: CANCELLED_BY_PATIENT,
};

export default CancelAppointmentContainer;
