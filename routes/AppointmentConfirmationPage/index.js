import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import { Query, graphql, withApollo } from 'react-apollo';
import _flowRight from 'lodash/flowRight';
import queryString from 'query-string';
import _get from 'lodash/get';

import { Loading } from '~/components';
import GeneralErrorPage from '~/routes/GeneralErrorPage';
import AppointmentConfirmationView from './view';

import {
    getAppointmentsQuery,
    acceptOrRejectAppointmentRequestMutation,
} from './queries';
import history from '~/util/history';

const VALID_STATUSES = [
    'ACTIVE',
    'REJECTED_BY_PATIENT',
    'PENDING_PATIENT_APPROVAL',
];

class AppointmentConfirmationPage extends PureComponent {
    constructor(props) {
        super(props);
        const urlParams = this.props.router.query;

        this.appointmentId = urlParams.appointmentId;

        this.state = {
            showModal: false,
            isModalSubmitting: false,
            isCardSubmitting: false,
            status: 'PENDING_PATIENT_APPROVAL',
        };
    }

    acceptAppointmentRequest = async () => {
        this.setState({ isCardSubmitting: true });
        try {
            await this.props.acceptOrRejectAppointmentRequestMutation({
                variables: {
                    input: {
                        accept: true,
                        appointmentId: this.appointmentId,
                    },
                },
            });
        } catch (err) {
            throw err;
        } finally {
            this.setState({ isCardSubmitting: false });
        }
        this.setState({
            showModal: false,
            status: 'ACTIVE',
        });
    };

    rejectAppointmentRequest = () => {
        this.setState({ showModal: true });
    };

    confirmRejection = async () => {
        this.setState({ isModalSubmitting: true });
        try {
            await this.props.acceptOrRejectAppointmentRequestMutation({
                variables: {
                    input: {
                        accept: false,
                        appointmentId: this.appointmentId,
                    },
                },
            });
        } catch (err) {
            throw err;
        } finally {
            this.setState({ isModalSubmitting: false });
        }
        this.setState({
            showModal: false,
            status: 'REJECTED_BY_PATIENT',
        });
    };

    cancelRejection = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { appointmentId } = this;
        if (!appointmentId) {
            throw new Error('Must specify appointmentId');
        }

        return (
            <Query
                query={getAppointmentsQuery}
                variables={{ id: appointmentId }}
                onCompleted={data =>
                    this.setState({
                        status: _get(data, 'getAppointment.status', ''),
                    })
                }
            >
                {({ loading, error, data }) => {
                    const {
                        showModal,
                        isModalSubmitting,
                        isCardSubmitting,
                    } = this.state;
                    const appointment = _get(data, 'getAppointment');
                    if (loading) return <Loading />;
                    if (
                        error ||
                        !appointment ||
                        !VALID_STATUSES.includes(appointment.status)
                    )
                        return <GeneralErrorPage />;

                    return (
                        <AppointmentConfirmationView
                            appointment={appointment}
                            showModal={showModal}
                            status={this.state.status}
                            isCardSubmitting={isCardSubmitting}
                            isModalSubmitting={isModalSubmitting}
                            onAccept={this.acceptAppointmentRequest}
                            onReject={this.rejectAppointmentRequest}
                            onConfirmRejection={this.confirmRejection}
                            onCancelRejection={this.cancelRejection}
                            confirmAppointmentRequestRejection={
                                this.confirmAppointmentRequestRejection
                            }
                        />
                    );
                }}
            </Query>
        );
    }
}

export default _flowRight(
    withRouter,
    withApollo,
    graphql(acceptOrRejectAppointmentRequestMutation, {
        name: 'acceptOrRejectAppointmentRequestMutation',
        options: {
            context: {
                clientName: 'appointment',
            },
        },
    })
)(AppointmentConfirmationPage);
