import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import { Mutation } from 'react-apollo';

import CancelAppointmentModal from './view';
import { cancelAppointmentMutation } from './queries';
import {
    CANCELLED_BY_PATIENT,
} from '../../../../util/strings';


class CancelAppointmentContainer extends PureComponent {
    onCancel = () => {
        this.props.toggleModalState();
    };

    render() {
        const { refetch } = this.props;
        return (
            <Mutation
                mutation={cancelAppointmentMutation}
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
