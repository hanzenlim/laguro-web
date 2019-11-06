import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'next/router';
import { Query, graphql, withApollo } from 'react-apollo';
import _flowRight from 'lodash/flowRight';
import _get from 'lodash/get';
import Head from 'next/head';
import { message } from 'antd';

import { Loading } from '~/components';
import GeneralErrorPage from '~/routes/GeneralErrorPage';
import { usePrivateApp } from '~/util/authUtils';
import AppointmentConfirmationView from './view';

import {
    getAppointmentsQuery,
    acceptOrRejectAppointmentRequestMutation,
} from './queries';

const VALID_STATUSES = [
    'ACTIVE',
    'REJECTED_BY_PATIENT',
    'PENDING_PATIENT_APPROVAL',
];

class AppointmentConfirmationPage extends PureComponent {
    constructor(props) {
        super(props);
        const { router } = this.props;
        const urlParams = router.query;

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
        const {
            acceptOrRejectAppointmentRequestMutation: acceptOrRejectAppointmentRequest,
        } = this.props;
        try {
            await acceptOrRejectAppointmentRequest({
                variables: {
                    input: {
                        accept: true,
                        appointmentId: this.appointmentId,
                    },
                },
            });
            this.setState({
                showModal: false,
                status: 'ACTIVE',
            });
        } catch (err) {
            if (err.message.includes('Forbidden')) {
                message.error(
                    'Forbidden: User is not allowed to do the action.',
                    5
                );
            }
        } finally {
            this.setState({ isCardSubmitting: false });
        }
    };

    rejectAppointmentRequest = () => {
        this.setState({ showModal: true });
    };

    confirmRejection = async () => {
        this.setState({ isModalSubmitting: true });
        const {
            acceptOrRejectAppointmentRequestMutation: acceptOrRejectAppointmentRequest,
        } = this.props;
        try {
            await acceptOrRejectAppointmentRequest({
                variables: {
                    input: {
                        accept: false,
                        appointmentId: this.appointmentId,
                    },
                },
            });
            this.setState({
                showModal: false,
                status: 'REJECTED_BY_PATIENT',
            });
        } catch (err) {
            if (err.message.includes('Forbidden')) {
                message.error(
                    'Forbidden: User is not allowed to do the action.',
                    5
                );
            }
        } finally {
            this.setState({ isModalSubmitting: false });
        }
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
            <Fragment>
                <Head>Laguro</Head>
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

                        const { status } = this.state;
                        return (
                            <AppointmentConfirmationView
                                appointment={appointment}
                                showModal={showModal}
                                status={status}
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
            </Fragment>
        );
    }
}

const withPrivateApp = WrappedComponent => props => {
    const { isRouteAccessible } = usePrivateApp();
    return isRouteAccessible ? <WrappedComponent {...props} /> : null;
};

export default _flowRight(
    withPrivateApp,
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
