import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { compose, Query, graphql, withApollo } from 'react-apollo';
import { message } from 'antd';

import { stripTimezone } from '../../../util/timeUtil';

import {
    getDentistQuery,
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
import { userHasSkippedMedicalHistory } from '../../../util/cookieUtils';
import { getUser } from '../../../util/authUtils';
import queryString from 'query-string';
import history from '../../../history';

const HANDLED_TIMESLOT_ERRORS = [
    'Timeslot is in the past',
    'Timeslot is no longer available',
];

class BookAppointment extends PureComponent {
    constructor(props) {
        super(props);

        const urlParams = queryString.parse(history.location.search);

        this.state = {
            reservationId: urlParams.reservationId || null,
            patientId: null,
            location: null,
            procedure: null,
            startTime: urlParams.startTime || null,
            endTime: urlParams.startTime
                ? stripTimezone(
                      moment(urlParams.startTime)
                          .add(props.firstAppointmentDuration, 'minutes')
                          .format()
                  )
                : null,
            isPaymentVisible: urlParams.startTime ? true : false,
            bookedAppointment: null,
            paymentError: null,
            isSubmitting: false,
        };
    }

    handleFilter = () => {
        this.setState({ isPaymentVisible: false });
    };

    handleSelect = async data => {
        const user = getUser();
        this.setState({
            reservationId: data.reservationId,
            patientId: _get(user, 'id'),
            location: data.location,
            procedure: data.procedure,
            startTime: stripTimezone(data.startTime),
            endTime: stripTimezone(data.endTime),
            isPaymentVisible: true,
        });

        return false;
    };

    handlePay = async paymentOptionId => {
        const user = getUser();
        const { client } = this.props;

        const {
            data: { getUser: getUserData },
        } = await client.query({
            query: checkPatientVerified,
            variables: { id: _get(user, 'id') },
            fetchPolicy: 'network-only',
        });

        this.redirectPatient(getUserData);

        try {
            this.setState({ isSubmitting: true });

            await this.props.mutate({
                variables: {
                    input: {
                        reservationId: this.state.reservationId,
                        patientId: _get(user, 'id'),
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

    handleBookAppointment = async timezone => {
        const user = getUser();
        const { client } = this.props;

        const {
            data: { getUser: getUserData },
        } = await client.query({
            query: checkPatientVerified,
            variables: { id: _get(user, 'id') },
            fetchPolicy: 'network-only',
        });

        this.redirectPatient(getUserData);

        try {
            this.setState({ isSubmitting: true });

            await this.props.mutate({
                variables: {
                    input: {
                        reservationId: this.state.reservationId,
                        patientId: _get(user, 'id'),
                        // procedure: this.state.procedure,
                        localStartTime: stripTimezone(
                            moment.tz(this.state.startTime, timezone).format()
                        ),
                        localEndTime: this.state.endTime,
                        // paymentOptionId,
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
        const user = getUser();
        const { client } = this.props;

        const {
            data: { getUser: getUserData },
        } = await client.query({
            query: checkPatientVerified,
            variables: { id: _get(user, 'id') },
            fetchPolicy: 'network-only',
        });
        return !this.redirectPatient(getUserData);
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
        } else if (
            !_get(user, 'hasSubmittedHealthHistoryForm') &&
            !userHasSkippedMedicalHistory()
        ) {
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

    render() {
        const { id } = this.props;

        const { isPaymentVisible, bookedAppointment } = this.state;

        return (
            <Query
                query={getDentistQuery}
                variables={{ id }}
                fetchPolicy="network-only"
            >
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
                            onFilter={this.handleFilter}
                            onPay={this.handlePay}
                            onBookAppointment={this.handleBookAppointment}
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

BookAppointment.propTypes = {
    client: PropTypes.object,
    firstAppointmentDuration: PropTypes.number,
    id: PropTypes.string,
    mutate: PropTypes.func,
};

export default compose(
    withApollo,
    graphql(createAppointmentMutation)
)(BookAppointment);
