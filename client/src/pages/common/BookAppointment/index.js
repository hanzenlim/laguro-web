import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import queryString from 'query-string';
import moment from 'moment';
import { compose, Query, graphql, withApollo } from 'react-apollo';
import { message } from 'antd';
import { stripTimezone } from '../../../util/timeUtil';
import { getDentistQuery, createAppointmentMutation } from './queries';
import BookAppointmentView from './view';
import { Loading } from '../../../components';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';
import emitter from '../../../util/emitter';
import { getUser } from '../../../util/authUtils';
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
            endTime: null,
            isPaymentVisible: !!urlParams.startTime,
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

    handleBookAppointment = async (timezone, firstAppointmentDuration) => {
        const user = getUser();

        // Show login modal if not logged in.
        if (!user) {
            emitter.emit('loginModal');

            return;
        }

        try {
            this.setState({ isSubmitting: true });

            await this.props.mutate({
                variables: {
                    input: {
                        reservationId: this.state.reservationId,
                        patientId: _get(user, 'id'),
                        localStartTime: stripTimezone(
                            moment.tz(this.state.startTime, timezone).format()
                        ),
                        localEndTime: stripTimezone(
                            moment(this.state.startTime)
                                .add(firstAppointmentDuration, 'minutes')
                                .format()
                        ),
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
                        />
                    );
                }}
            </Query>
        );
    }
}

BookAppointment.propTypes = {
    client: PropTypes.object,
    id: PropTypes.string,
    mutate: PropTypes.func,
};

export default compose(
    withApollo,
    graphql(createAppointmentMutation)
)(BookAppointment);
