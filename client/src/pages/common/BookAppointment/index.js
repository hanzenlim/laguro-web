import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { compose, Query, graphql, withApollo } from 'react-apollo';
import { message } from 'antd';

import { stripTimezone } from '../../../util/timeUtil';

import {
    getDentistQuery,
    getUserQuery,
    createAppointmentMutation,
    checkPatientVerified,
} from './queries';

import BookAppointmentView from './view';
import { Loading } from '../../../components';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';
import { redirect } from '../../../history';
import {
    PATIENT_ONBOARDING_MEDICAL_HISTORY_FORM,
    PATIENT_ONBOARDING_INSURANCE_FORM,
    ONBOARDING_NAME_AND_PERSONA_PAGE,
} from '../../../util/urls';

const HANDLED_TIMESLOT_ERRORS = [
    'Timeslot is in the past',
    'Timeslot is no longer available',
];

class BookAppointment extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            reservationId: null,
            patientId: null,
            location: null,
            procedure: null,
            startTime: null,
            endTime: null,
            isPaymentVisible: false,
            bookedAppointment: null,

            showVerificationModal: false,
            paymentError: null,
            isSubmitting: false,
        };
    }

    handleFilter = () => {
        this.setState({ isPaymentVisible: false });
    };

    handleSelect = async data => {
        this.setState({
            reservationId: data.reservationId,
            patientId: this.props.data.activeUser.id,
            location: data.location,
            procedure: data.procedure,
            startTime: stripTimezone(data.startTime),
            endTime: stripTimezone(data.endTime),
            isPaymentVisible: true,
        });

        return false;
    };

    handleCloseVerificationModal = () => {
        this.setState({
            showVerificationModal: false,
        });
    };

    handlePay = async paymentOptionId => {
        const {
            client,
            data: { activeUser },
        } = this.props;

        const {
            data: { getUser },
        } = await client.query({
            query: checkPatientVerified,
            variables: { id: activeUser.id },
            fetchPolicy: 'network-only',
        });

        this.redirectPatient(getUser);

        try {
            this.setState({ isSubmitting: true });

            await this.props.mutate({
                variables: {
                    input: {
                        reservationId: this.state.reservationId,
                        patientId: this.props.data.activeUser.id,
                        procedure: this.state.procedure,
                        localStartTime: this.state.startTime,
                        localEndTime: this.state.endTime,
                        paymentOptionId,
                    },
                },
            });

            this.setState({
                bookedAppointment: {
                    location: this.state.location,
                    time: moment(this.state.startTime).format('LLLL'),
                },
                isSubmitting: false,
            });
        } catch (error) {
            const errorMessage = error.graphQLErrors[0].message;
            if (HANDLED_TIMESLOT_ERRORS.includes(errorMessage))
                message.error(errorMessage);
            this.setState({ isSubmitting: false });
        }
    };

    checkIfVerified = async () => {
        const {
            client,
            data: { activeUser },
        } = this.props;

        const {
            data: { getUser },
        } = await client.query({
            query: checkPatientVerified,
            variables: { id: activeUser.id },
            fetchPolicy: 'network-only',
        });
        return !this.redirectPatient(getUser);
    };

    redirectPatient = user => {
        if (_isEmpty(_get(user, 'firstName'))) {
            this.setState({ isSubmitting: false });
            redirect({
                url: ONBOARDING_NAME_AND_PERSONA_PAGE,
                includeNewRedirectTo: true,
                newSearchParamKey: 'referer',
                newSearchParamValue: 'BookAppointment',
            });
            return true;
        } else if (!_get(user, 'hasSubmittedHealthHistoryForm')) {
            this.setState({ isSubmitting: false });
            redirect({
                url: PATIENT_ONBOARDING_MEDICAL_HISTORY_FORM,
                includeNewRedirectTo: true,
                newSearchParamKey: 'referer',
                newSearchParamValue: 'BookAppointment',
            });
            return true;
        } else if (_isEmpty(_get(user, 'insuranceInfo'))) {
            this.setState({ isSubmitting: false });
            redirect({
                url: PATIENT_ONBOARDING_INSURANCE_FORM,
                includeNewRedirectTo: true,
                newSearchParamKey: 'referer',
                newSearchParamValue: 'BookAppointment',
            });
            return true;
        }
        return false;
    };

    updateSubmittingState = isSubmitting => {
        this.setState({ isSubmitting });
    };

    handleVerificationResult = () => {
        this.setState({ showVerificationModal: false });
    };

    render() {
        const { id } = this.props;
        const {
            isPaymentVisible,
            bookedAppointment,
            showVerificationModal,
        } = this.state;

        return (
            <Query query={getDentistQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        return <RedirectErrorPage />;
                    }

                    return (
                        <BookAppointmentView
                            data={_get(data, 'getDentist.reservations')}
                            firstAppointmentDuration={_get(
                                data,
                                'getDentist.firstAppointmentDuration'
                            )}
                            isPaymentVisible={isPaymentVisible}
                            bookedAppointment={bookedAppointment}
                            showVerificationModal={showVerificationModal}
                            onFilter={this.handleFilter}
                            onPay={this.handlePay}
                            onSelect={this.handleSelect}
                            onVerificationResult={this.handleVerificationResult}
                            isSubmitting={this.state.isSubmitting}
                            updateSubmittingState={this.updateSubmittingState}
                            checkIfVerified={this.checkIfVerified}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default compose(
    withApollo,
    graphql(getUserQuery),
    graphql(createAppointmentMutation)
)(BookAppointment);
